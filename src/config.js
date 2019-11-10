var config = {};

config.debug = process.env.DEBUG || false;

config.mqtt  = {};
config.mqtt.topics = process.env.MQTT_TOPICS || 'redit/sensor';
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || '209.97.151.212';
config.mqtt.port      = process.env.MQTT_PORT      || 1883;

config.mongodb = {};
config.mongodb.hostname   = process.env.MONGODB_HOSTNAME   || '127.0.0.1';
config.mongodb.port       = process.env.MONGODB_PORT       || 27017;
config.mongodb.database   = process.env.MONGODB_DATABASE   || 'iotdb';
config.mongodb.collection   = process.env.MONGODB_COLLECTION   || 'mqtt_dash';

module.exports = config;