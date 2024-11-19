const express = require('express');
const router = express.Router();
const depotController = require('../controllers/depotController');
const { authenticate, adminAuth } = require('../middleware/authMiddleware');

router.get('/:lang?', depotController.getDepots);
router.get('/single/:id/:lang?', depotController.getDepotById);
router.post('/', adminAuth, depotController.createDepot);
router.put('/:id', adminAuth, depotController.updateDepot);
router.delete('/:id', adminAuth, depotController.deleteDepot);

module.exports = router;