const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const { authenticate, adminAuth } = require('../middleware/authMiddleware');

router.get('/:lang?', faqController.getFAQs);
router.get('/:id', faqController.getFAQById);
router.post('/', adminAuth, faqController.createFAQ);
router.put('/:id', adminAuth, faqController.updateFAQ);
router.delete('/:id', adminAuth, faqController.deleteFAQ);

module.exports = router;