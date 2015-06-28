var _ = require('underscore');
var BISON = require('bison');
var useBison = false;
var cls = require('./lib/class');
var http = require('http');
var socketio = require('socket.io');
var url = require('url');
var Utils = require('./utils');
var WS = {};

module.exports = WS;

/**
 * Abstract Server and Connection classes
 */
var Server = cls.Class.extend({
    init: function (port) {
        this.port = port;
    },

    onConnect: function (callback) {
        this.connectionCallback = callback;
    },

    onError: function (callback) {
        this.errorCallback = callback;
    },

    broadcast: function (message) {
        throw 'Not implemented';
    },

    forEachConnection: function (callback) {
        _.each(this._connections, callback);
    },

    addConnection: function (connection) {
        this._connections[connection.id] = connection;
    },

    removeConnection: function (id) {
        delete this._connections[id];
    },

    getConnection: function (id) {
        return this._connections[id];
    }
});


var Connection = cls.Class.extend({
    init: function (id, connection, server) {
        this._connection = connection;
        this._server = server;
        this.id = id;
    },

    onClose: function (callback) {
        this.closeCallback = callback;
    },

    listen: function (callback) {
        this.listenCallback = callback;
    },

    broadcast: function (message) {
        throw 'Not implemented';
    },

    send: function (message) {
        throw 'Not implemented';
    },

    sendUTF8: function (data) {
        throw 'Not implemented';
    },

    close: function (logError) {
        log.info('Closing connection to ' + this._connection.remoteAddress + '. Error: ' + logError);
        this._connection.conn.close();
    }
});



/**
 * WebsocketServer
 */
WS.WebsocketServer = Server.extend({
    _connections: {},
    _counter: 0,

    init: function (port, useOnePort, ip) {
        var self = this;

        this._super(port);
        this.ip = ip;

        // Are we doing both client and server on one port?
        if (useOnePort === true) {
            // Yes, we are; this is the default configuration option.

            // Use 'connect' for its static module
            var connect = require('connect');
            var app = connect();

            // Serve everything in the client subdirectory statically
            var serveStatic = require('serve-static');
            app.use(serveStatic('client', {'index': ['index.html']}));

            // Display errors (such as 404's) in the server log
            var logger = require('morgan');
            app.use(logger('dev'));

            // Generate (on the fly) the pages needing special treatment
            app.use(function handleDynamicPageRequests(request, response) {
                var path = url.parse(request.url).pathname;
                console.log("DEY WANT A PATH: ", path);
                switch (path) {
                    case '/status':
                        // The server status page
                        if (self.statusCallback) {
                            response.writeHead(200);
                            response.write(self.statusCallback());
                        }
                        break;
                    case '/config/config_build.json':
                    case '/config/config_local.json':
                        // Generate the config_build/local.json files on the
                        // fly, using the host address and port from the
                        // incoming http header

                        // Grab the incoming host:port request string
                        var headerPieces = request.connection.parser.incoming.headers.host.split(':', 2);

                        // Determine new host string to give clients
                        var newHost;
                        if ((typeof headerPieces[0] === 'string') && (headerPieces[0].length > 0))  {
                            // Seems like a valid string, lets use it
                            newHost = headerPieces[0];
                        } else {
                            // The host value doesn't seem usable, so
                            // fallback to the local interface IP address
                            newHost = request.connection.address().address;
                        }

                        // Default port is 80
                        var newPort = 80;
                        if (2 === headerPieces.length) {
                            // We've been given a 2nd value, maybe a port #
                            if ((typeof headerPieces[1] === 'string') && (headerPieces[1].length > 0)) {
                                // If a usable port value was given, use that instead
                                var tmpPort = parseInt(headerPieces[1], 10);
                                if (!isNaN(tmpPort) && (tmpPort > 0) && (tmpPort < 65536)) {
                                    newPort = tmpPort;
                                }
                            }
                        }

                        // Assemble the config data structure
                        var newConfig = {
                            host: newHost,
                            port: newPort,
                            dispatcher: false,
                        };

                        // Make it JSON
                        var newConfigString = JSON.stringify(newConfig);

                        // Create appropriate http headers
                        var responseHeaders = {
                            'Content-Type': 'application/json',
                            'Content-Length': newConfigString.length
                        };

                        // Send it all back to the client
                        response.writeHead(200, responseHeaders);
                        response.end(newConfigString);
                        break;
                    case '/shared/js/file.js':
                        // Sends the real shared/js/file.js to the client
                        sendFile('js/file.js', response, log);
                        break;
                    case '/shared/js/gametypes.js':
                        // Sends the real shared/js/gametypes.js to the client
                        sendFile('js/gametypes.js', response, log);
                        break;
                    default:
                        response.writeHead(404);
                }
                response.end();
            });

            this._httpServer = http.createServer(app).listen(port, this.ip || undefined, function serverEverythingListening() {
                log.info('Server (everything) is listening on port ' + port);
            });
        } else {
            // Only run the server side code
            this._httpServer = http.createServer(function statusListener(request, response) {
                var path = url.parse(request.url).pathname;
                if ((path === '/status') && self.statusCallback) {
                    response.writeHead(200);
                    response.write(self.statusCallback());
                } else {
                    response.writeHead(404);
                }
                response.end();
            });
            this._httpServer.listen(port, this.ip || undefined, function serverOnlyListening() {
                log.info('Server (only) is listening on port ' + port);
            });
        }

console.log(socketio);

        this._ioServer = new socketio(this._httpServer, {path: '/browserquest'});
        this._ioServer.on('connection', function webSocketListener(socket) {
            log.info('Client socket connected from ' + socket.conn.remoteAddress);
            // Add remoteAddress property
            socket.remoteAddress = socket.conn.remoteAddress;

            var c = new WS.socketioConnection(self._createId(), socket, self);

            if (self.connectionCallback) {
                self.connectionCallback(c);
            }

            self.addConnection(c);
        });
    },

    _createId: function() {
        return '5' + Utils.random(99) + '' + (this._counter++);
    },

    broadcast: function (message) {
        this.forEachConnection(function(connection) {
            connection.send(message);
        });
    },

    onRequestStatus: function (statusCallback) {
        this.statusCallback = statusCallback;
    }
});


/**
 * Connection class for socket.io Socket
 * https://github.com/Automattic/socket.io
 */
WS.socketioConnection = Connection.extend({
    init: function (id, connection, server) {
        var self = this;

        this._super(id, connection, server);

        this._connection.on('message', function (message) {
            if (self.listenCallback) {
                if (useBison) {
                    self.listenCallback(BISON.decode(message));
                } else {
                    self.listenCallback(JSON.parse(message));
                }
            }
        });

        this._connection.on('disconnect', function () {
            log.info('Client closed socket ' + self._connection.conn.remoteAddress);
            if (self.closeCallback) {
                self.closeCallback();
            }
            delete self._server.removeConnection(self.id);
        });
    },

    send: function(message) {
        var data;
        if (useBison) {
            data = BISON.encode(message);
        } else {
            data = JSON.stringify(message);
        }
        this.sendUTF8(data);
    },

    sendUTF8: function(data) {
        this._connection.send(data);
    }
});

// Sends a file to the client
function sendFile (file, response, log) {
    try {
        var fs = require('fs');
        var realFile = fs.readFileSync(__dirname + '/../../shared/' + file);
        var responseHeaders = {
            'Content-Type': 'text/javascript',
            'Content-Length': realFile.length
        };
        response.writeHead(200, responseHeaders);
        response.end(realFile);
    }
    catch (err) {
        response.writeHead(500);
        log.error('Something went wrong when trying to send ' + file);
        log.error('Error stack: ' + err.stack);
    }
}
