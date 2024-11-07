const express = require('express');
const router = express.Router();
const divisionController = require('../controllers/divisionController');
const { authenticate, adminAuth } = require('../middleware/authMiddleware');

router.get('/:lang?', divisionController.getDivisions);
router.get('/single/:id/:lang?', divisionController.getDivisionById);
router.post('/', adminAuth, divisionController.createDivision);
router.put('/:id', adminAuth, divisionController.updateDivision);
router.delete('/:id', adminAuth, divisionController.deleteDivision);

module.exports = router;