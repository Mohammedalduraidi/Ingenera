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




module.exports = db;