const mongoose = require('mongoose');

const athleteSchema = mongoose.Schema(
    {
        name: { 
            type: String 
        },
        position: {
            type: String 
        },
        speed: { 
            type: Number, min: 1, max: 10 
        },
        strength: { 
            type: Number, min: 1, max: 10 
        },
        stamina: { 
            type: Number, min: 1, max: 10 
        },
        coach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Coach',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Athlete', athleteSchema);