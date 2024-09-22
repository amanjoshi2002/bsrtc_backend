const express = require('express');
const router = express.Router();
const contactInfoController = require('../controllers/contactInfoController');
const { authenticate, adminAuth } = require('../middleware/authMiddleware');

router.get('/', contactInfoController.getContactInfos);
router.get('/:id', contactInfoController.getContactInfoById);
router.post('/', adminAuth, contactInfoController.createContactInfo);
router.put('/:id', adminAuth, contactInfoController.updateContactInfo);
router.delete('/:id', adminAuth, contactInfoController.deleteContactInfo);

module.exports = router;