const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const contactInfoRoutes = require('./routes/contactInfoRoutes');
const divisionRoutes = require('./routes/divisionRoutes');
const contactRoutes = require('./routes/contactInfoRoutes');
const phoneDirectoryRoutes = require('./routes/phoneDirectoryRoutes');
const policyRoutes = require('./routes/policyRoutes');
const aboutUsRoutes = require('./routes/aboutUsRoutes');
const authRoutes = require('./routes/authRoutes');
const popularRouteRoutes = require('./routes/popularRouteRoutes');
const tenderRoutes = require('./routes/tenderRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const touristDestinationRoutes = require('./routes/touristDestinationRoutes');
const faqRoutes = require('./routes/faqRoutes');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/phone-directory', phoneDirectoryRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/about-us', aboutUsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/popular-routes', popularRouteRoutes);
app.use('/api/tenders', tenderRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/tourist-destinations', touristDestinationRoutes);
app.use('/api/divisions', divisionRoutes);
app.use('/api/contact-info', contactInfoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});