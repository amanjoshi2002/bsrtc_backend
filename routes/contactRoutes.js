const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getContact);
router.post('/', contactController.updateContact);
router.delete('/', contactController.deleteContact);
router.put('/division/:id', contactController.updateDivision);
router.delete('/division/:id', contactController.deleteDivision);

module.exports = router;