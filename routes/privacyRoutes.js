const express = require('express');
const router = express.Router();
const privacyController = require('../controllers/privacyController');
const { authenticate, adminAuth } = require('../middleware/authMiddleware');

router.get('/', privacyController.getPrivacy);
router.post('/', adminAuth, privacyController.addPrivacy);
router.put('/:id', adminAuth, privacyController.updatePrivacy);
router.delete('/:id', adminAuth, privacyController.deletePrivacy);

module.exports = router;