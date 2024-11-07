const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');
const { authenticate, adminAuth } = require('../middleware/authMiddleware');
router.get('/:lang?', policyController.getPolicies);
router.post('/', adminAuth, policyController.createPolicy);
router.put('/', adminAuth, policyController.updatePolicies);
router.delete('/:id', adminAuth, policyController.deletePolicy);

module.exports = router;