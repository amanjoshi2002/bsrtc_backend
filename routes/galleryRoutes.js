const express = require('express');
const router = express.Router();
const multer = require('multer');
const galleryController = require('../controllers/galleryController');
const { authenticate, adminAuth } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', galleryController.getPhotos);
router.get('/:id', galleryController.getPhotoById);
router.post('/', adminAuth, upload.single('photo'), galleryController.createPhoto);
router.put('/:id', adminAuth, upload.single('photo'), galleryController.updatePhoto);
router.delete('/:id', adminAuth, galleryController.deletePhoto);

module.exports = router;