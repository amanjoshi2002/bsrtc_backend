const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

router.get('/', policyController.getPolicies);
router.post('/', policyController.createPolicy);
router.put('/', policyController.updatePolicies); // Ensure this line is correct
router.delete('/:id', policyController.deletePolicy);

module.exports = router;