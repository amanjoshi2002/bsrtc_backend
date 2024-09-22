const express = require('express');
const router = express.Router();
const contactInfoController = require('../controllers/contactInfoController');

router.get('/', contactInfoController.getContactInfos);
router.get('/:id', contactInfoController.getContactInfoById);
router.post('/', contactInfoController.createContactInfo);
router.put('/:id', contactInfoController.updateContactInfo);
router.delete('/:id', contactInfoController.deleteContactInfo);

module.exports = router;