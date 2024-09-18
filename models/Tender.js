const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pdf: { type: String, required: true },
    referenceNo: { type: String, required: true, unique: true },
    closingDate: { type: Date, required: true },
    bidOpeningDate: { type: Date, required: true }
});

module.exports = mongoose.model('Tender', tenderSchema);