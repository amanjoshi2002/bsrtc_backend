// routes/flashNewsRoutes.js
const express = require('express');
const router = express.Router();
const flashNewsController = require('../controllers/flashNewsController');
const { adminAuth } = require('../middleware/authMiddleware'); // Optional: If you want to protect routes

router.post('/', adminAuth, flashNewsController.createFlashNews);
router.get('/', flashNewsController.getAllFlashNews);
router.get('/:id', flashNewsController.getFlashNewsById);
router.put('/:id', adminAuth, flashNewsController.updateFlashNews);
router.delete('/:id', adminAuth, flashNewsController.deleteFlashNews);

module.exports = router;