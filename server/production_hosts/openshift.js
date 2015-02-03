'use strict';

var env = process.env;

module.exports = {
  ip: env.OPENSHIFT_NODEJS_IP,
  port: env.OPENSHIFT_NODEJS_PORT,
  redis_port: env.OPENSHIFT_REDIS_PORT || env.OPENSHIFT_REDIS_DB_PORT,
  redis_host: env.OPENSHIFT_REDIS_HOST || env.OPENSHIFT_REDIS_DB_HOST,
  redis_password: env.REDIS_PASSWORD,

  isActive: function () {
    return env.OPENSHIFT_NODEJS_IP !== undefined;
  }
};
