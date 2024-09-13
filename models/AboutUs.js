const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
    content: String
});

module.exports = mongoose.model('AboutUs', aboutUsSchema);