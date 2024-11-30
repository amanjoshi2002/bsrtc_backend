// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const newsController = require('../controllers/newsController');
const { adminAuth } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', adminAuth, upload.fields([{ name: 'thumbnail' }, { name: 'photo' }]), newsController.createNews);
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.put('/:id', adminAuth, upload.fields([{ name: 'thumbnail' }, { name: 'photo' }]), newsController.updateNews);
router.delete('/:id', adminAuth, newsController.deleteNews);

module.exports = router;