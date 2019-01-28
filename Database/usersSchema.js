const mongoose = require('mongoose');

let Schema = mongoose.Schema; // Create a mongoose schema
let Users = new Schema({
    lastName: { type: String },
    firstName: { type: String },
    email: { type: String },
    password: { type: String },
    acceptTerms: { type: Boolean },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: String },
    userType: {
        type: String,
        enum: ["Admin", "pm", "bm"]
    },
});

let users = mongoose.model('Users', Users);

module.exports.users = users;