const mongoose = require('mongoose');

const galleryEventSchema = new mongoose.Schema({
    category: { type: String, required: true },
    photos: [{ type: String, required: true }] // Array of photo URLs
});

module.exports = mongoose.model('GalleryEvent', galleryEventSchema);