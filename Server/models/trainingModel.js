const mongoose = require('mongoose');

const trainingSchema = mongoose.Schema(
    {
        formationType: {
            type: String
        },
        playersCount: {
            type: Number
        },
        trainingChecklist: {
            activity: { type: String },
            completed: { type: Boolean, default: false }
        },
        performanceTrends: {
            speed: { type: Number, min: 1, max: 10 },
            strength: { type: Number, min: 1, max: 10 },
            stamina: { type: Number, min: 1, max: 10 }
        },
        athlete: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Athlete',
            required: true
        },
        coach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Coach',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Training', trainingSchema);