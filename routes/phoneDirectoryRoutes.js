const express = require('express');
const router = express.Router();
const phoneDirectoryController = require('../controllers/phoneDirectoryController');
const { authenticate, adminAuth } = require('../middleware/authMiddleware');
router.get('/:lang?', phoneDirectoryController.getDivisions);
router.post('/', adminAuth, phoneDirectoryController.createDivision);
router.put('/', adminAuth, phoneDirectoryController.updateDivisions);
router.delete('/:id', adminAuth, phoneDirectoryController.deleteDivision);

module.exports = router;