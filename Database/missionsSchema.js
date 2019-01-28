const mongoose = require('mongoose');
let Schema = mongoose.Schema; // Create a mongoose schema
let missionsSchema = new Schema({
    companyName: { type: String },
    isPublished: { type: Boolean },
    missionTittle: { type: String },
    phase: { type: String },
    isASAP: { type: Boolean },
    adress: { type: String },
    termsAndCondition: { type: String },
    acceptTerms: { type: Boolean },
    experience: { type: String },
    description: { type: String },
    keywords: [{
        type: String
    }],
    budget: { type: String }
})


let Missions = mongoose.model('Missions', missionsSchema)

module.exports.Missions = Missions;