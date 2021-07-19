'use strict';

module.exports = function sessionHandler(session) {
  const redis = require('redis');
  let RedisStore = require('connect-redis')(session);
  let redisClient = redis.createClient();

  return new RedisStore({ client: redisClient });
};
