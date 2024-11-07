const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    nameEn: String,
    nameHi: String,
    contentEn: String,
    contentHi: String
});

module.exports = mongoose.model('Policy', policySchema);