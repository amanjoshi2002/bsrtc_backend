const express = require('express');
const router = express.Router();
const multer = require('multer');
const touristDestinationController = require('../controllers/touristDestinationController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', touristDestinationController.getDestinations);
router.get('/:id', touristDestinationController.getDestinationById);
router.post('/', upload.single('image'), touristDestinationController.createDestination);
router.put('/:id', upload.single('image'), touristDestinationController.updateDestination);
router.delete('/:id', touristDestinationController.deleteDestination);

module.exports = router;