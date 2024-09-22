const express = require('express');
const router = express.Router();
const divisionController = require('../controllers/divisionController');

router.get('/', divisionController.getDivisions);
router.get('/:id', divisionController.getDivisionById);
router.post('/', divisionController.createDivision);
router.put('/:id', divisionController.updateDivision);
router.delete('/:id', divisionController.deleteDivision);

module.exports = router;