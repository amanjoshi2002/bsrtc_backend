const mongoose = require('mongoose');

// Check if the model already exists before creating it
const CancellationPolicy = mongoose.models.CancellationPolicy || mongoose.model('CancellationPolicy', new mongoose.Schema({
    titleEn: String,
    contentEn: String,
    titleHi: String,
    contentHi: String
}));

module.exports = CancellationPolicy;