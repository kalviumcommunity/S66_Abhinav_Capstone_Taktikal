const mongoose = require('mongoose');

const trainingSchema = mongoose.Schema(
    {
        formationType: {
            type: String,
            required: true
        },
        formationPositions: {
            type: Map,
            of: {
                x: { type: Number, required: true },
                y: { type: Number, required: true },
                playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Athlete' }
            },
            default: {}
        },
        playersCount: {
            type: Number,
            required: true
        },
        trainingChecklist: [{
            activity: { type: String },
            completed: { type: Boolean, default: false }
        }],
        athletes: [{
            name: { type: String, required: true },
            position: { type: String, required: true },
            speed: { type: Number, min: 1, max: 10, required: true },
            strength: { type: Number, min: 1, max: 10, required: true },
            stamina: { type: Number, min: 1, max: 10, required: true }
        }],
        performanceTrends: {
            speed: [{ type: Number, min: 1, max: 10 }],
            strength: [{ type: Number, min: 1, max: 10 }],
            stamina: [{ type: Number, min: 1, max: 10 }]
        }
    }
);

module.exports = mongoose.model('Training', trainingSchema);