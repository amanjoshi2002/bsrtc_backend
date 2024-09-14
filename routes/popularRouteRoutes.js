const express = require('express');
const router = express.Router();
const multer = require('multer');
const popularRouteController = require('../controllers/popularRouteController'); // Ensure this matches the file name

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
router.post('/', upload.single('image'), popularRouteController.createPopularRoute);
router.put('/:id', upload.single('image'), popularRouteController.updatePopularRoute);
router.delete('/:id', popularRouteController.deletePopularRoute);

module.exports = router;