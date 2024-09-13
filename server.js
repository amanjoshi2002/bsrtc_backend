const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const phoneDirectoryRoutes = require('./routes/phoneDirectoryRoutes');
const policyRoutes = require('./routes/policyRoutes');
const aboutUsRoutes = require('./routes/aboutUsRoutes');
const authRoutes = require('./routes/authRoutes');
const config = require('config');
const morgan = require('morgan');
const cors = require('cors'); // Add this line

const app = express();
const PORT = process.env.PORT || config.get('port') || 3000;

require('dotenv').config();

connectDB();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS

app.use('/api/contact', contactRoutes);
app.use('/api/phone-directory', phoneDirectoryRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/about-us', aboutUsRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});