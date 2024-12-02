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
const privacyRoutes = require('./routes/privacyRoutes');
const termsRoutes = require('./routes/termsRoutes');
const depotRoutes = require('./routes/depotRoutes');
const aboutProfileRoutes = require('./routes/aboutProfileRoutes');
const galleryEventRoutes = require('./routes/galleryEventRoutes');
const flashNewsRoutes = require('./routes/flashNewsRoutes'); // Adjust the path as necessary
const cancellationPolicyRoutes = require('./routes/cancellationPolicyRoutes');
const bookingPolicyRoutes = require('./routes/bookingPolicyRoutes');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const newsRoutes = require('./routes/newsRoutes');
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
    origin: process.env.CORS_ORIGIN.replace(/\/$/, ''), // Remove trailing slash if present
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

  app.use(cors(corsOptions));
// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/phone-directory', phoneDirectoryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/depots', depotRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/about-us', aboutUsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/popular-routes', popularRouteRoutes);
app.use('/api/tenders', tenderRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/tourist-destinations', touristDestinationRoutes);
app.use('/api/booking-policy', bookingPolicyRoutes);
app.use('/api/divisions', divisionRoutes);
app.use('/api/contact-info', contactInfoRoutes);
app.use('/api/privacy', privacyRoutes);
app.use('/api/terms', termsRoutes);
app.use('/api/flash-news', flashNewsRoutes);
app.use('/api/gallery-events', galleryEventRoutes);
app.use('/api/cancellation-policy', cancellationPolicyRoutes);

app.use('/api/about-profile', aboutProfileRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});