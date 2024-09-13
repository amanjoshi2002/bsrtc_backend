const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    mainPhoneNumber: String,
    mainEmail: String
});

module.exports = mongoose.model('Contact', contactSchema);