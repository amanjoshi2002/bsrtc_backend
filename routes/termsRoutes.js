const express = require('express');
const router = express.Router();
const termsController = require('../controllers/termsController');
const { authenticate, adminAuth } = require('../middleware/authMiddleware');

router.get('/', termsController.getTerms);
router.post('/', adminAuth, termsController.addTerms);
router.put('/:id', adminAuth, termsController.updateTerms);
router.delete('/:id', adminAuth, termsController.deleteTerms);

module.exports = router;