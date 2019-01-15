const mongoose = require('mongoose');

mongoose.connect('mongodb://find-jobs:Jackel12@ds215370.mlab.com:15370/find-jobs');
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', () => {
	console.log('mongoose connection error');
});

db.once('open', () => {
	console.log('mongoose connected successfully');
});

let Schema = mongoose.Schema; // Create a mongoose schema

let Client = new Schema({
	lastName: { type: String },
	firstName: { type: String },
	email: { type: String },
	password: { type: String },
	acceptTerms: { type: Boolean },
	resetPasswordToken: { type: String },
	userType: {
		type: String,
		enum: ["Admin", "pm", "bm"]
	},
	resetPasswordExpires: { type: Date }
});

let client = mongoose.model('Client', Client);

module.exports.client = client;
