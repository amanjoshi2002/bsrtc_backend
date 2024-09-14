const mongoose = require('mongoose');

const popularRouteSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false // Make it optional if you want
    }
});

module.exports = mongoose.model('PopularRoute', popularRouteSchema);