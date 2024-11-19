const mongoose = require('mongoose');

// Check if the model already exists before creating it
const Terms = mongoose.models.Terms || mongoose.model('Terms', new mongoose.Schema({
    titleEn: String,
    contentEn: String,
    titleHi: String,
    contentHi: String
}));

module.exports = Terms;