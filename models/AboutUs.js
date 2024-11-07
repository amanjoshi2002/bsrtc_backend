const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
    aboutUsEn: String,
    visionEn: String,
    missionEn: String,
    aboutUsHi: String,
    visionHi: String,
    missionHi: String
});

module.exports = mongoose.model('AboutUs', aboutUsSchema);