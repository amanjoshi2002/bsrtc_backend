const express = require('express');
const router = express.Router();
const multer = require('multer');
const popularRouteController = require('../controllers/popularRouteController'); // Ensure this matches the file name
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

router.get('/', popularRouteController.getPopularRoutes);
router.post('/', adminAuth, upload.single('image'), popularRouteController.createPopularRoute);
router.put('/:id', adminAuth, upload.single('image'), popularRouteController.updatePopularRoute);
router.delete('/:id', adminAuth, popularRouteController.deletePopularRoute);

module.exports = router;