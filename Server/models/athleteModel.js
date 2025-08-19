const mongoose = require('mongoose');

const athleteSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true,
            enum: ['Forward', 'Midfielder', 'Defender', 'Goalkeeper']
        },
        speed: {
            type: Number,
            min: 1,
            max: 10,
            required: true
        },
        strength: {
            type: Number,
            min: 1,
            max: 10,
            required: true
        },
        stamina: {
            type: Number,
            min: 1,
            max: 10,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
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