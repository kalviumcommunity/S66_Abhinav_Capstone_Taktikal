const mongoose = require('mongoose');

const coachSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            minLength: 6,
            required: true
        },
        // Profile section fields (optional, filled during profile setup)
        title: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        athletes: {
            type: String,
            default: ""
        },
        profileImage: {
            type: String,
            default: ""
        },
        // Stats section fields (optional)
        teamsCoached: {
            type: String,
            default: ""
        },
        currentAthletes: {
            type: String,
            default: ""
        },
        championships: {
            type: String,
            default: ""
        },
        yearsActive: {
            type: String,
            default: ""
        },
        // Contacts section fields (optional)
        socialLinks: {
            linkedin: {
                type: String,
                default: ""
            },
            twitter: {
                type: String,
                default: ""
            },
            videoChannel: {
                type: String,
                default: ""
            }
        },
        // User management fields
        isNewUser: {
            type: Boolean,
            default: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        lastLogin: {
            type: Date,
            default: Date.now
        },
        loginHistory: [{
            timestamp: {
                type: Date,
                default: Date.now
            },
            ipAddress: String,
            userAgent: String
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Coach', coachSchema);