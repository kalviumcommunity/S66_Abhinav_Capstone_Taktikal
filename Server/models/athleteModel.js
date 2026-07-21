const mongoose = require('mongoose');

const athleteSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        position: {
            type: String,
            required: true
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
            default: true,
            index: true
        },
        coach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Coach',
            required: true,
            index: true
        }
    },
    { timestamps: true }
);

// Compound index for querying active team roster per coach
athleteSchema.index({ coach: 1, isActive: 1, name: 1 });
athleteSchema.index({ coach: 1, isActive: 1, position: 1 });

module.exports = mongoose.model('Athlete', athleteSchema);