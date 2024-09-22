const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phoneNumber1: { type: String, required: true },
    phoneNumber2: { type: String, required: true }
});

module.exports = mongoose.model('ContactInfo', contactInfoSchema);