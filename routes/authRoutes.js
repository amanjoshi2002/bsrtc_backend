const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, adminAuth } = require('../middleware/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', authenticate, authController.getProfile);

// Admin routes
router.get('/users', adminAuth, authController.getAllUsers); // Add this line
router.put('/user/:id', adminAuth, authController.updateUser);
router.delete('/user/:id', adminAuth, authController.deleteUser);

router.post('/resend-otp',authController.resendOtp)
router.post('/verify-otp', authController.verifyOtp);

module.exports = router;