const express = require('express');
const router = express.Router();
const multer = require('multer');
const galleryController = require('../controllers/galleryController');

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
router.post('/', upload.single('photo'), galleryController.createPhoto);
router.put('/:id', upload.single('photo'), galleryController.updatePhoto);
router.delete('/:id', galleryController.deletePhoto);

module.exports = router;