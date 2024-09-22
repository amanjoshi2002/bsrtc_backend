const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');
const { authenticate, adminAuth } = require('../middleware/authMiddleware');
router.get('/', policyController.getPolicies);
router.post('/', adminAuth, policyController.createPolicy);
router.put('/', adminAuth, policyController.updatePolicies); // Ensure this line is correct
router.delete('/:id', adminAuth, policyController.deletePolicy);

module.exports = router;