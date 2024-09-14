const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const phoneDirectoryRoutes = require('./routes/phoneDirectoryRoutes');
const policyRoutes = require('./routes/policyRoutes');
const aboutUsRoutes = require('./routes/aboutUsRoutes');
const authRoutes = require('./routes/authRoutes');
const popularRouteRoutes = require('./routes/popularRouteRoutes');
const config = require('config');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || config.get('port') || 5000;

require('dotenv').config();

connectDB();

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(uploadsDir));

app.use('/api/contact', contactRoutes);
app.use('/api/phone-directory', phoneDirectoryRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/about-us', aboutUsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/popular-routes', popularRouteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});