const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { 
        type: String, 
        required: true, 
        enum: ['EV', 'petrol', 'diesel'] 
    },
    photo: { type: String, required: true }
});

module.exports = mongoose.model('Gallery', gallerySchema);