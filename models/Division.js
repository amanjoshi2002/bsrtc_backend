const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
    name: String,
    personInCharge: String,
    phoneNumber: String,
    email: String
});

module.exports = mongoose.model('Division', divisionSchema);