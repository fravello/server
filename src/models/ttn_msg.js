const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ttn_msg = Schema({
    _id: [Schema.Types.ObjectId],
    devID : String,
	payload : {
		app_id : String,
		dev_id : String,
		hardware_serial : String,
		port : Number,
		counter : Number,
		payload_raw : Buffer,
		payload_fields : {
			ASCII : String
		},
		metadata : {
			time : String,
			frequency : Number,
			modulation : String,
			data_rate : String,
			airtime : Number,
			coding_rate : String,
			gateways : [
				{
					gtw_id : String,
					timestamp : Number,
					time : String,
					channel : Number,
					rssi : Number,
					snr : Number,
					rf_chain : Number,
					latitude : Number,
					longitude : Number,
					location_source : String
				}
			]
		}
	},
	date : String

});

module.exports = mongoose.model('ttn_msg', ttn_msg, 'ttn_msg');