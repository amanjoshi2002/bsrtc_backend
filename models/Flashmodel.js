// models/flashNewsModel.js
const mongoose = require('mongoose');

const flashNewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('FlashNews', flashNewsSchema);