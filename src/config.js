var config = {};

config.debug = process.env.DEBUG || false;

config.mongodb = {};
config.mongodb.hostname   = process.env.MONGODB_HOSTNAME   || '127.0.0.1';
config.mongodb.port       = process.env.MONGODB_PORT       || 27017;
config.mongodb.database   = process.env.MONGODB_DATABASE   || 'iotdb';

module.exports = config;