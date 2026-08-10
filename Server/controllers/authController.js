const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Coach = require('../models/coachModel');

const assertDbReady = async (res) => {
    if (mongoose.connection.readyState === 1) return true;

    // Retry once — covers cold start / env fixed after boot
    try {
        const DbConnection = require('../db/DbConnection');
        const ok = await DbConnection();
        if (ok && mongoose.connection.readyState === 1) return true;
    } catch (_) {
        // fall through
    }

    res.status(503).json({
        message: 'Database is unavailable. On Render: set MONGO_URI (no quotes), restart the service, and allow 0.0.0.0/0 in Atlas Network Access.'
    });
    return false;
};
// Generate JWT Token
const generateToken = (id) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is missing.');
    }
    return jwt.sign({ id }, secret, {
        expiresIn: '7d' // Secure 7-day token
    });
};

// Set secure auth cookie
const setAuthCookie = (res, token) => {
    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions = {
        httpOnly: true,
        // Cross-site (Netlify frontend → Render API) requires SameSite=None + Secure
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };
    res.cookie('token', token, cookieOptions);
};

// Helper to sanitize coach object sent in API responses
const formatCoachResponse = (coach) => ({
    id: coach._id,
    name: coach.name,
    email: coach.email,
    sport: coach.sport || 'Football',
    title: coach.title || '',
    description: coach.description || '',
    location: coach.location || '',
    athletes: coach.athletes || '',
    profileImage: coach.profileImage || '',
    teamsCoached: coach.teamsCoached || '',
    currentAthletes: coach.currentAthletes || '',
    championships: coach.championships || '',
    yearsActive: coach.yearsActive || '',
    socialLinks: coach.socialLinks || {},
    isNewUser: coach.isNewUser,
    lastLogin: coach.lastLogin,
    events: coach.events || [],
    activities: coach.activities || [],
    tactics_saved_formations: coach.tactics_saved_formations || [],
    tactics_checklist: coach.tactics_checklist || []
});

// Register new coach
const registerCoach = async (req, res) => {
    try {
        const { name, email, password, sport } = req.body;

        // Strict Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({ message: 'Please provide a valid email address' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        if (!(await assertDbReady(res))) return;

        const normalizedEmail = email.trim().toLowerCase();

        // Check if coach already exists
        const existingCoach = await Coach.findOne({ email: normalizedEmail });
        if (existingCoach) {
            return res.status(400).json({ message: 'Coach already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create coach
        const coach = new Coach({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            sport: sport || 'Football',
            isNewUser: true
        });

        // IP & User Agent
        const ipAddress = req.ip || 'Unknown';
        const userAgent = req.get('User-Agent') || 'Unknown';
        coach.loginHistory.push({ timestamp: new Date(), ipAddress, userAgent });
        coach.lastLogin = new Date();

        await coach.save();

        // Generate token
        const token = generateToken(coach._id);
        setAuthCookie(res, token);

        res.status(201).json({
            message: 'Coach registered successfully',
            coach: formatCoachResponse(coach),
            token
        });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Login coach
const loginCoach = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        if (!(await assertDbReady(res))) return;

        const normalizedEmail = email.trim().toLowerCase();

        const coach = await Coach.findOne({ email: normalizedEmail });
        if (!coach) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!coach.isActive) {
            return res.status(401).json({ message: 'Account is deactivated' });
        }

        const isPasswordValid = await bcrypt.compare(password, coach.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(coach._id);
        setAuthCookie(res, token);

        const ipAddress = req.ip || 'Unknown';
        const userAgent = req.get('User-Agent') || 'Unknown';

        coach.lastLogin = new Date();
        coach.loginHistory.push({ timestamp: new Date(), ipAddress, userAgent });

        if (coach.loginHistory.length > 50) {
            coach.loginHistory = coach.loginHistory.slice(-50);
        }

        await coach.save();

        res.json({
            message: 'Login successful',
            coach: formatCoachResponse(coach),
            token
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// Logout coach
const logoutCoach = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

// Get current coach profile
const getProfile = async (req, res) => {
    try {
        const coach = await Coach.findById(req.user._id).select('-password');
        if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
        }

        res.json({
            coach: formatCoachResponse(coach)
        });
    } catch (error) {
        console.error('Get profile error:', error.message);
        res.status(500).json({ message: 'Server error fetching profile' });
    }
};

// Update coach profile (mass assignment protected)
const updateProfile = async (req, res) => {
    try {
        const coach = await Coach.findById(req.user._id);
        if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
        }

        // Whitelisted fields only
        const {
            name, title, description, location, athletes, sport,
            teamsCoached, currentAthletes, championships, yearsActive,
            events, activities, tactics_saved_formations, tactics_checklist,
            socialLinks, profileImage
        } = req.body;

        if (name !== undefined) coach.name = name.trim();
        if (title !== undefined) coach.title = title;
        if (description !== undefined) coach.description = description;
        if (location !== undefined) coach.location = location;
        if (athletes !== undefined) coach.athletes = athletes;
        if (sport !== undefined) coach.sport = sport;
        if (teamsCoached !== undefined) coach.teamsCoached = teamsCoached;
        if (currentAthletes !== undefined) coach.currentAthletes = currentAthletes;
        if (championships !== undefined) coach.championships = championships;
        if (yearsActive !== undefined) coach.yearsActive = yearsActive;
        if (events !== undefined && Array.isArray(events)) coach.events = events;
        if (activities !== undefined && Array.isArray(activities)) coach.activities = activities;
        if (tactics_saved_formations !== undefined && Array.isArray(tactics_saved_formations)) {
            coach.tactics_saved_formations = tactics_saved_formations;
        }
        if (tactics_checklist !== undefined && Array.isArray(tactics_checklist)) {
            coach.tactics_checklist = tactics_checklist;
        }
        if (socialLinks !== undefined && typeof socialLinks === 'object') {
            coach.socialLinks = { ...coach.socialLinks, ...socialLinks };
        }
        if (profileImage !== undefined) {
            // Limit base64 image string size to ~2MB
            if (profileImage && profileImage.length > 3 * 1024 * 1024) {
                return res.status(400).json({ message: 'Profile image size exceeds 2MB limit' });
            }
            coach.profileImage = profileImage;
        }

        await coach.save();

        res.json({
            message: 'Profile updated successfully',
            coach: formatCoachResponse(coach)
        });
    } catch (error) {
        console.error('Update profile error:', error.message);
        res.status(500).json({ message: 'Server error updating profile' });
    }
};

// Complete profile setup
const completeProfileSetup = async (req, res) => {
    try {
        const coach = await Coach.findByIdAndUpdate(
            req.user._id,
            { isNewUser: false },
            { new: true }
        ).select('-password');

        res.json({
            message: 'Profile setup completed',
            coach: {
                id: coach._id,
                isNewUser: coach.isNewUser
            }
        });
    } catch (error) {
        console.error('Complete setup error:', error.message);
        res.status(500).json({ message: 'Server error completing setup' });
    }
};

// Get login history
const getLoginHistory = async (req, res) => {
    try {
        const coach = await Coach.findById(req.user._id).select('loginHistory lastLogin');
        if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
        }

        res.json({
            loginHistory: coach.loginHistory,
            lastLogin: coach.lastLogin,
            totalLogins: coach.loginHistory.length
        });
    } catch (error) {
        console.error('Get login history error:', error.message);
        res.status(500).json({ message: 'Server error fetching login history' });
    }
};

// Send Password OTP to coach email
const sendPasswordOTP = async (req, res) => {
    try {
        const coach = await Coach.findById(req.user._id);
        if (!coach) {
            return res.status(404).json({ message: 'Coach account not found' });
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        coach.passwordResetOTP = {
            code: otpCode,
            expiresAt,
            isVerified: false
        };
        await coach.save();

        console.log(`\n==========================================`);
        console.log(`🔑 PASSWORD RESET OTP FOR ${coach.email}: ${otpCode}`);
        console.log(`==========================================\n`);

        res.json({
            message: `OTP code sent to ${coach.email}. (Valid for 10 minutes)`,
            email: coach.email,
            ...(process.env.NODE_ENV !== 'production' ? { debugOtp: otpCode } : {})
        });
    } catch (error) {
        console.error('Send OTP error:', error.message);
        res.status(500).json({ message: 'Failed to send OTP code' });
    }
};

// Verify Password OTP
const verifyPasswordOTP = async (req, res) => {
    try {
        const { otp } = req.body;
        if (!otp) {
            return res.status(400).json({ message: 'Please provide the 6-digit OTP code' });
        }

        const coach = await Coach.findById(req.user._id);
        if (!coach || !coach.passwordResetOTP) {
            return res.status(400).json({ message: 'No active OTP request found. Please request a new code.' });
        }

        const { code, expiresAt } = coach.passwordResetOTP;

        if (new Date() > new Date(expiresAt)) {
            return res.status(400).json({ message: 'OTP code has expired. Please request a new code.' });
        }

        if (code !== otp.trim()) {
            return res.status(400).json({ message: 'Invalid OTP code. Please check and try again.' });
        }

        coach.passwordResetOTP.isVerified = true;
        await coach.save();

        res.json({ message: 'OTP code verified successfully' });
    } catch (error) {
        console.error('Verify OTP error:', error.message);
        res.status(500).json({ message: 'Server error verifying OTP code' });
    }
};

// Change Password with verified OTP
const changePasswordWithOTP = async (req, res) => {
    try {
        const { otp, newPassword } = req.body;

        if (!otp || !newPassword) {
            return res.status(400).json({ message: 'Please provide OTP and new password' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters long' });
        }

        const coach = await Coach.findById(req.user._id);
        if (!coach || !coach.passwordResetOTP) {
            return res.status(400).json({ message: 'No active OTP verification found' });
        }

        const { code, expiresAt, isVerified } = coach.passwordResetOTP;

        if (new Date() > new Date(expiresAt)) {
            return res.status(400).json({ message: 'OTP code expired. Please request a new code.' });
        }

        if (code !== otp.trim() || !isVerified) {
            return res.status(400).json({ message: 'OTP code has not been verified' });
        }

        const salt = await bcrypt.genSalt(10);
        coach.password = await bcrypt.hash(newPassword, salt);
        coach.passwordResetOTP = undefined;

        await coach.save();

        res.json({ message: 'Password updated successfully. Please log in with your new password.' });
    } catch (error) {
        console.error('Change password error:', error.message);
        res.status(500).json({ message: 'Server error updating password' });
    }
};

// Delete Coach Account
const deleteAccount = async (req, res) => {
    try {
        const coachId = req.user._id;

        const Athlete = require('../models/athleteModel');
        const Performance = require('../models/performanceModel');

        await Athlete.deleteMany({ coach: coachId });
        await Performance.deleteMany({ coach: coachId });
        await Coach.findByIdAndDelete(coachId);

        res.clearCookie('token');
        res.json({ message: 'Account and associated team data deleted successfully' });
    } catch (error) {
        console.error('Delete account error:', error.message);
        res.status(500).json({ message: 'Server error deleting account' });
    }
};

module.exports = {
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
};
