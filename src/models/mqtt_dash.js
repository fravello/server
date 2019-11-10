const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mqtt_dash = Schema({
	_id: [Schema.Types.ObjectId],
	topic: String,
	payload : {
		sensor : String,
		value : String,
		date : String
	},
	date : String
});

module.exports = mongoose.model('mqtt_dash', mqtt_dash, 'mqtt_dash');