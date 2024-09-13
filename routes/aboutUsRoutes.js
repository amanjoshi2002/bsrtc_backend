const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutUsController');

router.get('/', aboutUsController.getAboutUs);
router.post('/', aboutUsController.updateAboutUs);
router.delete('/', aboutUsController.deleteAboutUs);

module.exports = router;