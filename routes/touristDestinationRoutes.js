const express = require('express');
const router = express.Router();
const multer = require('multer');
const touristDestinationController = require('../controllers/touristDestinationController');
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

router.get('/', touristDestinationController.getDestinations);
router.get('/:id', touristDestinationController.getDestinationById);
router.post('/', adminAuth, upload.single('image'), touristDestinationController.createDestination);
router.put('/:id', adminAuth, upload.single('image'), touristDestinationController.updateDestination);
router.delete('/:id', adminAuth, touristDestinationController.deleteDestination);

module.exports = router;