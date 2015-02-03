'use strict';

var env = process.env;

module.exports = {
  port: env.PORT,
  redis_port: env.HEROKU_REDIS_PORT,
  redis_host: env.HEROKU_REDIS_HOST,
  redis_password: env.HEROKU_REDIS_PASSWORD,

  isActive: function () {
    return env.HEROKU !== undefined;
  }
};
