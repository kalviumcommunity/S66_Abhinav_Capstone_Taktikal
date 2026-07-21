const mongoose = require('mongoose');

const coachSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            minLength: 6,
            required: true
        },
        sport: {
            type: String,
            enum: ['Football', 'Cricket', 'Volleyball', 'Basketball', 'Handball', 'Rugby', 'Chess', 'Table Tennis', 'Badminton'],
            default: 'Football'
        },
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
        events: [{
            title: String,
            date: String,
            status: String
        }],
        activities: [{
            title: String,
            date: String
        }],
        tactics_saved_formations: [{
            name: String,
            players: Array
        }],
        tactics_checklist: [{
            text: String,
            checked: Boolean
        }],
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
        isNewUser: {
            type: Boolean,
            default: true
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true
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
        }],
        passwordResetOTP: {
            code: String,
            expiresAt: Date,
            isVerified: Boolean
        }
    },
    { timestamps: true }
);

// Compound index for active status and email search
coachSchema.index({ email: 1, isActive: 1 });

module.exports = mongoose.model('Coach', coachSchema);