const express = require('express');
const router = express.Router();
const multer = require('multer');
const galleryEventController = require('../controllers/galleryEventController');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Define routes
router.get('/', galleryEventController.getGalleryEvents);
router.get('/:id', galleryEventController.getGalleryEventById);
router.post('/', upload.array('photos', 10), galleryEventController.createGalleryEvent); // Allow multiple photos
router.put('/:id', upload.array('photos', 10), galleryEventController.updateGalleryEvent); // Allow multiple photos
router.delete('/:id', galleryEventController.deleteGalleryEvent);

module.exports = router; 