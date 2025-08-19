const jwt = require('jsonwebtoken');
const Coach = require('../models/coachModel');

// Protect routes - Authentication middleware
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

            // Get coach from token
            const coach = await Coach.findById(decoded.id).select('-password');

            if (!coach) {
                return res.status(401).json({ message: 'Not authorized, coach not found' });
            }

            if (!coach.isActive) {
                return res.status(401).json({ message: 'Account is deactivated' });
            }

            req.user = coach;
            next();
        } catch (error) {
            console.error('Auth middleware error:', error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = {
    protect
};
