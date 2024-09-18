const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutUsController');
const { authenticate, adminAuth } = require('../middleware/authMiddleware');

router.get('/', aboutUsController.getAboutUs);
router.post('/', aboutUsController.updateAboutUs);
router.delete('/', aboutUsController.deleteAboutUs);


// router.get('/', aboutUsController.getAboutUs);
// router.post('/', adminAuth, aboutUsController.updateAboutUs);
// router.delete('/', adminAuth, aboutUsController.deleteAboutUs); 

module.exports = router;