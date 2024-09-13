const express = require('express');
const router = express.Router();
const phoneDirectoryController = require('../controllers/phoneDirectoryController');

router.get('/', phoneDirectoryController.getDivisions);
router.post('/', phoneDirectoryController.createDivision);
router.put('/:id', phoneDirectoryController.updateDivision);
router.delete('/:id', phoneDirectoryController.deleteDivision);

module.exports = router;