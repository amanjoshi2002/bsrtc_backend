const mongoose = require('mongoose');

const aboutProfileSchema = new mongoose.Schema({
    titleEn: { type: String, required: true },
    titleHi: { type: String, required: true },
    nameEn: { type: String, required: true },
    nameHi: { type: String, required: true },
    photos: [{ type: String, required: true }] // Array to hold up to 4 photo paths
});

module.exports = mongoose.model('AboutProfile', aboutProfileSchema);