
var cls = require("./lib/class"),
Player = require('./player'),
Messages = require("./message"),
redis = require("redis");

module.exports = DatabaseHandler = cls.Class.extend({
init: function(config){
    client = redis.createClient(config.redis_port, config.redis_host, {socket_nodelay: true});
},
loadPlayer: function(player){
    var userKey = "u:" + player.name;
    var curTime = (new Date()).getTime();
    client.smembers("usr", function(err, replies){
        for(var index = 0; index < replies.length; index++){
            if(replies[index].toString() === player.name){
                client.multi()
                    .hget(userKey, "pw") // 0
                    .hget(userKey, "armor") // 1
                    .hget(userKey, "weapon") // 2
                    .hget(userKey, "exp") // 3
                    .hget("b:" + player.connection._connection.remoteAddress, "time") // 4
                    .hget("b:" + player.connection._connection.remoteAddress, "banUseTime") // 5
                    .hget("b:" + player.connection._connection.remoteAddress, "loginTime") // 6
                    .hget(userKey, "avatar") // 7
                    .zrange("adrank", "-1", "-1") // 8
                    .get("nextNewArmor") // 9
                    .hget(userKey, "inventory0") // 10
                    .hget(userKey, "inventory1") // 11
                    .hget(userKey, "achievement1:found") // 12
                    .hget(userKey, "achievement1:progress") // 13
                    .hget(userKey, "achievement2:found") // 14
                    .hget(userKey, "achievement2:progress") // 15
                    .hget(userKey, "achievement3:found") // 16
                    .hget(userKey, "achievement3:progress") // 17
                    .exec(function(err, replies){
                        if(replies[0].toString() !== player.pw){
                            player.connection.sendUTF8("wrongpw");
                            player.connection.close("Wrong Password: " + player.name);
                            return;
                        }
                        var bannedTime = replies[4]*1;
                        var banUseTime = replies[5]*1;
                        if(isNaN(bannedTime)){
                            bannedTime = 0;
                        }
                        if(isNaN(banUseTime)){
                            banUseTime = 0;
                        }
                        var lastLoginTime = replies[6]*1;
                        if(isNaN(lastLoginTime)){
                            lastLoginTime = 0;
                        }
                        var d = new Date();
                        d.setDate(d.getDate() - d.getDay());
                        d.setHours(0, 0, 0);
                        log.info(player.name + " last login time: " + lastLoginTime + " " + (new Date(lastLoginTime)).toString());
                        log.info("last sunday time: " + d.getTime() + " " + d.toString());
                        if(lastLoginTime < d.getTime()){
                            log.info(player.name + "ban is initialized.");
                            bannedTime = 0;
                            client.hset("b:" + player.connection._connection.remoteAddress, "time", bannedTime);
                        }
                        client.hset("b:" + player.connection._connection.remoteAddress, "loginTime", curTime);
                        var avatar = player.name === replies[8].toString() ? replies[9] : replies[7];

                        var achievement1found = replies[12] === "true" ? true : false;
                        var achievement1progress = isNaN(replies[13]*1) ? 0 : replies[13]*1;
                        var achievement2found = replies[14] === "true" ? true : false;
                        var achievement2progress = isNaN(replies[15]*1) ? 0 : replies[15]*1;
                        var achievement3found = replies[16] === "true" ? true : false;
                        var achievement3progress = isNaN(replies[17]*1) ? 0 : replies[17]*1;
                        player.sendWelcome(replies[1], replies[2], replies[3], bannedTime, banUseTime, avatar, replies[10], replies[11], [achievement1found, achievement2found, achievement3found], [achievement1progress, achievement2progress, achievement3progress]);
                    }); 
                return;
            }
        }
        client.multi()
            .sadd("usr", player.name)
            .hset(userKey, "pw", player.pw)
            .hset(userKey, "email", player.email)
            .hset(userKey, "armor", "clotharmor")
            .hset(userKey, "avatar", "clotharmor")
            .hset(userKey, "weapon", "sword1")
            .hset(userKey, "exp", 0)
            .hset("b:" + player.connection._connection.remoteAddress, "loginTime", curTime)
            .exec(function(err, replies){
                log.info("New User: " + player.name);
                player.sendWelcome("clotharmor", "sword1", 0, 0, 0, "clotharmor");
            });
    });
},
checkBan: function(player){
    client.smembers("ipban", function(err, replies){
        for(var index = 0; index < replies.length; index++){
            if(replies[index].toString() === player.connection._connection.remoteAddress){
                client.multi()
                    .hget("b:" + player.connection._connection.remoteAddress, "rtime")
                    .hget("b:" + player.connection._connection.remoteAddress, "time")
                    .exec(function(err, replies){
                         var curTime = new Date().getTime();
                         var banEndTime = replies[0]*1;
                         log.info("curTime: " + curTime);
                         log.info("banEndTime: " + banEndTime);
                         if(banEndTime > curTime){
                             player.connection.sendUTF8("ban");
                             player.connection.close("IP Banned player: " + player.name + " " + player.connection._connection.remoteAddress);
                         }
                    });
                return;
            }
        }
    });
},
banPlayer: function(adminPlayer, banPlayer, days){
    client.smembers("adminname", function(err, replies){
        for(var index = 0; index < replies.length; index++){
            if(replies[index].toString() === adminPlayer.name){
                var curTime = (new Date()).getTime();
                client.sadd("ipban", banPlayer.connection._connection.remoteAddress);
                adminPlayer.server.pushBroadcast(new Messages.Chat(banPlayer, "/1 " + adminPlayer.name + "-- 밴 ->" + banPlayer.name + " " + days + "일"));
                setTimeout( function(){ banPlayer.connection.close("Added IP Banned player: " + banPlayer.name + " " + banPlayer.connection._connection.remoteAddress); }, 30000);
                client.hset("b:" + banPlayer.connection._connection.remoteAddress, "rtime", (curTime+(days*24*60*60*1000)).toString());
                log.info(adminPlayer.name + "-- BAN ->" + banPlayer.name + " to " + (new Date(curTime+(days*24*60*60*1000)).toString()));
                return;
            }
        }
    });
},
newBanPlayer: function(adminPlayer, banPlayer){
    if(adminPlayer.experience > 100000){
        client.hget("b:" + adminPlayer.connection._connection.remoteAddress, "banUseTime", function(err, reply){
            var curTime = (new Date()).getTime();
            if(curTime > (reply*1) + 1000*60*60*24){
                banPlayer.bannedTime++;
                log.info("bannedTime: " + banPlayer.bannedTime);
                client.sadd("ipban", banPlayer.connection._connection.remoteAddress);
                client.hset("b:" + banPlayer.connection._connection.remoteAddress, "rtime", (curTime+(Math.pow(2,(banPlayer.bannedTime))*500*60)).toString());
                client.hset("b:" + banPlayer.connection._connection.remoteAddress, "time", banPlayer.bannedTime.toString());
                client.hset("b:" + adminPlayer.connection._connection.remoteAddress, "banUseTime", curTime.toString());
                setTimeout( function(){ banPlayer.connection.close("Added IP Banned player: " + banPlayer.name + " " + banPlayer.connection._connection.remoteAddress); }, 30000);
                adminPlayer.server.pushBroadcast(new Messages.Chat(banPlayer, "/1 " + adminPlayer.name + "-- 밴 ->" + banPlayer.name + " " + banPlayer.bannedTime + "번째 " + (Math.pow(2,(banPlayer.bannedTime))/2) + "분"));
            }
            return;
        });
    }
},
banTerm: function(time){
    return Math.pow(2, time)*500*60;
},
equipArmor: function(name, armor){
    client.hset("u:" + name, "armor", armor);
},
equipAvatar: function(name, armor){
    client.hset("u:" + name, "avatar", armor);
},
equipWeapon: function(name, weapon){
    client.hset("u:" + name, "weapon", weapon);
},
setExp: function(name, exp){
    client.hset("u:" + name, "exp", exp);
},
setInventory: function(name, itemKind, number){
    client.hset("u:" + name, "inventory" + number, Types.getKindAsString(itemKind));
},
makeEmptyInventory: function(name, number){
    client.hdel("u:" + name, "inventory" + number);
},
foundAchievement: function(name, number){
    client.hset("u:" + name, "achievement" + number + ":found", "true");
},
progressAchievement: function(name, number, progress){
    client.hset("u:" + name, "achievement" + number + ":progress", progress);
}
});