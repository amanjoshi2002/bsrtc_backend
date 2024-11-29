const express = require('express');
const router = express.Router();
const multer = require('multer');
const newsController = require('../controllers/newsController');
const { adminAuth } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', adminAuth, upload.array('photos', 10), (req, res, next) => {
    console.log('Request body:', req.body); // Log the request body
    console.log('Files received:', req.files); // Log the uploaded files
    next(); // Call the next middleware
}, newsController.createNews);

router.get('/', newsController.getNews);
router.put('/:id', adminAuth, upload.array('photos', 10), newsController.updateNews);
router.delete('/:id', adminAuth, newsController.deleteNews);

module.exports = router;