const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
    nameEn: String,
    nameHi: String,
    designationEn: String,
    designationHi: String,
    officeEn: String,
    officeHi: String,
    phoneNumber: String,
    email: String
});

const phoneDirectoryDivisionSchema = new mongoose.Schema({
    nameEn: String,
    nameHi: String,
    officers: [officerSchema]
});

module.exports = mongoose.model('PhoneDirectoryDivision', phoneDirectoryDivisionSchema);