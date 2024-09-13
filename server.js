const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const phoneDirectoryRoutes = require('./routes/phoneDirectoryRoutes');
const policyRoutes = require('./routes/policyRoutes');
const aboutUsRoutes = require('./routes/aboutUsRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

connectDB();

app.use(bodyParser.json());
app.use('/api/contact', contactRoutes);
app.use('/api/phone-directory', phoneDirectoryRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/about-us', aboutUsRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});