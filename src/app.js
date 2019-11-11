const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const socketIO = require('socket.io');
const http = require('http');

var mqtt = require('mqtt');
var config = require('./config');

const app = express();
const server = http.createServer(app); 
const io = socketIO.listen(server);

var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
var client   = mqtt.connect(mqttUri);

client.on('connect', function () {
    client.subscribe(config.mqtt.topics);
});

var mongoUri = 'mongodb://' + config.mongodb.hostname + ':' + config.mongodb.port;

mongodb.MongoClient.connect(mongoUri, { useNewUrlParser: true }, function(error, database) {

    if(error != null) {
        throw error;
    }

    client.on('message', function (topic, message) {
        var messageObject = {
            topic: topic,
            payload: message.toString(),
            timestamp: new Date().getTime()
        };

        io.emit("mqtt_dash", messageObject);

        db = database.db(config.mongodb.database);

        db.collection(config.mongodb.collection).insertOne(messageObject, function(error, result) {
            if(error != null) {
                console.log("ERROR: " + error);
            }
        });
    });
});


//--------------------------------------------------------------------------------------------------------//

// connection to db
mongoose.connect('mongodb://localhost/iotdb',{useNewUrlParser: true,  useUnifiedTopology: true})
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/index');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))

// routes
app.use('/', indexRoutes);

server.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});