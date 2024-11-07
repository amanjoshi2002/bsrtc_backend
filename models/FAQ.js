const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    questionEn: { type: String, required: true },
    answerEn: { type: String, required: true },
    questionHi: { type: String, required: true },
    answerHi: { type: String, required: true }
});

module.exports = mongoose.model('FAQ', faqSchema);