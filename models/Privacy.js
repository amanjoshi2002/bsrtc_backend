const mongoose = require('mongoose');

const Privacy = mongoose.models.Privacy || mongoose.model('Privacy', new mongoose.Schema({
    titleEn: String,
    contentEn: String,
    titleHi: String,
    contentHi: String
}));

module.exports = Privacy;
