const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
    name: String,
    designation: String,
    office: String,
    phoneNumber: String,
    email: String
});

const phoneDirectoryDivisionSchema = new mongoose.Schema({
    name: String,
    officers: [officerSchema]
});

module.exports = mongoose.model('PhoneDirectoryDivision', phoneDirectoryDivisionSchema);