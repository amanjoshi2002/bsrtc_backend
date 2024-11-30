// models/newsModel.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    publish: {
        type: Date,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    headline: {
        type: String,
        required: true
    },
    subline: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title_hindi: {
        type: String,
        required: true
    },
    publish_hindi: {
        type: Date,
        required: true
    },
    content_hindi: {
        type: String,
        required: true
    },
    headline_hindi: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('News', newsSchema);