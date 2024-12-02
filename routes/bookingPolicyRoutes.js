const express = require('express');
const router = express.Router();
const bookingPolicyController = require('../controllers/bookingPolicyController');
const { authenticate, adminAuth } = require('../middleware/authMiddleware');

router.get('/', bookingPolicyController.getBookingPolicies);
router.post('/', adminAuth, bookingPolicyController.addBookingPolicy);
router.put('/:id', adminAuth, bookingPolicyController.updateBookingPolicy);
router.delete('/:id', adminAuth, bookingPolicyController.deleteBookingPolicy);

module.exports = router;