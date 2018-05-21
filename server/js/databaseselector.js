path = require('path');

module.exports = function(config) {
    console.log(config);
    return require(path.resolve(__dirname, 'db_providers', config.database));
};
