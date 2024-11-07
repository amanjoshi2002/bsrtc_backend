const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
    nameEn: { type: String, required: true },
    nameHi: { type: String, required: true },
    personInChargeEn: { type: String, required: true },
    personInChargeHi: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true }
});

module.exports = mongoose.model('Division', divisionSchema);