// models/newsModel.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        en: { type: String, required: true },
        hi: { type: String, required: true }
    },
    publish: { type: Date, required: true },
    authorName: {
        en: { type: String, required: true },
        hi: { type: String, required: true }
    },
    headline: {
        en: { type: String, required: true },
        hi: { type: String, required: true }
    },
    subline: {
        en: { type: String, required: true },
        hi: { type: String, required: true }
    },
    photos: [{ type: String, required: true }]
});

module.exports = mongoose.model('News', newsSchema);