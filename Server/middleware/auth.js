const jwt = require('jsonwebtoken');
const Coach = require('../models/coachModel');

// Protect routes - Authentication middleware
const protect = async (req, res, next) => {
    let token;

    // 1. Check HttpOnly cookie
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } 
    // 2. Check Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('FATAL: JWT_SECRET environment variable is missing.');
            return res.status(500).json({ message: 'Internal server configuration error' });
        }

        // Verify token
        const decoded = jwt.verify(token, secret);

        // Fetch coach
        const coach = await Coach.findById(decoded.id).select('-password');

        if (!coach) {
            return res.status(401).json({ message: 'Not authorized, coach account not found' });
        }

        if (!coach.isActive) {
            return res.status(401).json({ message: 'Account is deactivated' });
        }

        req.user = coach;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error.message);
        return res.status(401).json({ message: 'Not authorized, token verification failed' });
    }
};

module.exports = {
    protect
};
