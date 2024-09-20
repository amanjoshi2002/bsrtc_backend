const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    personInCharge: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true }
});

module.exports = mongoose.model('Division', divisionSchema);