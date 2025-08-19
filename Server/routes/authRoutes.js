const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    registerCoach,
    loginCoach,
    getProfile,
    updateProfile,
    completeProfileSetup,
    getLoginHistory
} = require('../controllers/authController');

// Public routes
router.post('/register', registerCoach);
router.post('/login', loginCoach);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/complete-setup', protect, completeProfileSetup);
router.get('/login-history', protect, getLoginHistory);

module.exports = router;
