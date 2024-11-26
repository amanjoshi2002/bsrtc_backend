const express = require('express');
const router = express.Router();
const aboutProfileController = require('../controllers/aboutProfileController');
const { adminAuth } = require('../middleware/authMiddleware');
const multer = require('multer');

// Configure multer for file uploads with disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', adminAuth, upload.single('photo'), aboutProfileController.createAboutProfile);
router.get('/:lang?', aboutProfileController.getAboutProfiles);
router.put('/:id', adminAuth, upload.single('photo'), aboutProfileController.updateAboutProfile);
router.delete('/:id', adminAuth, aboutProfileController.deleteAboutProfile);

module.exports = router;