const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Coach = require('../models/coachModel');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '30d'
    });
};

// Register new coach
const registerCoach = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }

        // Check if coach already exists
        const existingCoach = await Coach.findOne({ email });
        if (existingCoach) {
            return res.status(400).json({ message: 'Coach already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create coach
        const coach = await Coach.create({
            name,
            email,
            password: hashedPassword,
            isNewUser: true
        });

        // Generate token
        const token = generateToken(coach._id);

        // Log registration activity
        const activityData = {
            timestamp: new Date(),
            ipAddress: req.ip || req.connection.remoteAddress || 'Unknown',
            userAgent: req.get('User-Agent') || 'Unknown'
        };
        coach.loginHistory.push(activityData);
        coach.lastLogin = new Date();
        await coach.save();

        res.status(201).json({
            message: 'Coach registered successfully',
            coach: {
                id: coach._id,
                name: coach.name,
                email: coach.email,
                isNewUser: coach.isNewUser
            },
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Login coach
const loginCoach = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check for coach
        const coach = await Coach.findOne({ email });
        if (!coach) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if account is active
        if (!coach.isActive) {
            return res.status(401).json({ message: 'Account is deactivated' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, coach.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(coach._id);

        // Log login activity
        const activityData = {
            timestamp: new Date(),
            ipAddress: req.ip || req.connection.remoteAddress || 'Unknown',
            userAgent: req.get('User-Agent') || 'Unknown'
        };

        // Update login history and last login
        coach.lastLogin = new Date();
        coach.loginHistory.push(activityData);
        
        // Keep only last 50 records
        if (coach.loginHistory.length > 50) {
            coach.loginHistory = coach.loginHistory.slice(-50);
        }

        await coach.save();

        res.json({
            message: 'Login successful',
            coach: {
                id: coach._id,
                name: coach.name,
                email: coach.email,
                isNewUser: coach.isNewUser,
                profileImage: coach.profileImage,
                lastLogin: coach.lastLogin
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// Get current coach profile
const getProfile = async (req, res) => {
    try {
        const coach = await Coach.findById(req.user._id).select('-password');
        
        if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
        }

        res.json({
            coach: {
                id: coach._id,
                name: coach.name,
                email: coach.email,
                title: coach.title,
                description: coach.description,
                location: coach.location,
                athletes: coach.athletes,
                profileImage: coach.profileImage,
                teamsCoached: coach.teamsCoached,
                currentAthletes: coach.currentAthletes,
                championships: coach.championships,
                yearsActive: coach.yearsActive,
                socialLinks: coach.socialLinks,
                isNewUser: coach.isNewUser,
                lastLogin: coach.lastLogin,
                loginHistory: coach.loginHistory
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error fetching profile' });
    }
};

// Update coach profile
const updateProfile = async (req, res) => {
    try {
        const updateData = req.body;
        
        // Remove sensitive fields that shouldn't be updated via this endpoint
        delete updateData.password;
        delete updateData.email;
        delete updateData._id;

        const coach = await Coach.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
        }

        res.json({
            message: 'Profile updated successfully',
            coach: {
                id: coach._id,
                name: coach.name,
                email: coach.email,
                title: coach.title,
                description: coach.description,
                location: coach.location,
                athletes: coach.athletes,
                profileImage: coach.profileImage,
                teamsCoached: coach.teamsCoached,
                currentAthletes: coach.currentAthletes,
                championships: coach.championships,
                yearsActive: coach.yearsActive,
                socialLinks: coach.socialLinks,
                isNewUser: coach.isNewUser
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
};

// Complete profile setup (mark as not new user)
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
        console.error('Complete profile setup error:', error);
        res.status(500).json({ message: 'Server error completing profile setup' });
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
        console.error('Get login history error:', error);
        res.status(500).json({ message: 'Server error fetching login history' });
    }
};

module.exports = {
    registerCoach,
    loginCoach,
    getProfile,
    updateProfile,
    completeProfileSetup,
    getLoginHistory
};
