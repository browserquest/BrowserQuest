var config = {}

config.port = process.env.PORT;
config.redis_url = process.env.REDIS_URL

config.isActive = function() {
  return process.env.HEROKU !== undefined;
}

module.exports = config;
