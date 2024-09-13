const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    name: String,
    content: String
});

module.exports = mongoose.model('Policy', policySchema);