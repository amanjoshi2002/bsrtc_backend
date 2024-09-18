const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true }
});

module.exports = mongoose.model('Gallery', gallerySchema);