const mongoose = require('mongoose');

const coachSchema = mongoose.Schema(
    {
        name:{
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
        profilePicture: {
            type: String,
            default: ""
        },
        age: {
            type: Number,
            default: ""
        },
        sport: {
            type: String,
            enum: [ 'football', 'handball', 'cricket' ],
            required: true
        },
        location: {
            type: String,
            default: ""
        },
        socialLinks: {
            Instagram: String, 
            LinkedIn: String,
            Twitter: String,
            Facebook: String
        }
    }
);

module.exports = mongoose.model('Coach', coachSchema);