const express = require('express');
const router = express.Router();
const cancellationPolicyController = require('../controllers/cancellationPolicyController');
const { authenticate, adminAuth } = require('../middleware/authMiddleware');

router.get('/', cancellationPolicyController.getCancellationPolicies);
router.post('/', adminAuth, cancellationPolicyController.addCancellationPolicy);
router.put('/:id', adminAuth, cancellationPolicyController.updateCancellationPolicy);
router.delete('/:id', adminAuth, cancellationPolicyController.deleteCancellationPolicy);

module.exports = router;