const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    registerCoach,
    loginCoach,
    logoutCoach,
    getProfile,
    updateProfile,
    completeProfileSetup,
    getLoginHistory,
    sendPasswordOTP,
    verifyPasswordOTP,
    changePasswordWithOTP,
    deleteAccount
} = require('../controllers/authController');

// Public routes
router.post('/register', registerCoach);
router.post('/login', loginCoach);
router.post('/logout', logoutCoach);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/complete-setup', protect, completeProfileSetup);
router.get('/login-history', protect, getLoginHistory);

// OTP Password Change & Account Deletion
router.post('/send-otp', protect, sendPasswordOTP);
router.post('/verify-otp', protect, verifyPasswordOTP);
router.post('/change-password-otp', protect, changePasswordWithOTP);
router.delete('/account', protect, deleteAccount);

module.exports = router;
