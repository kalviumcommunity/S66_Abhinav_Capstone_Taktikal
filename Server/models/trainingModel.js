const mongoose = require('mongoose');

const trainingSchema = mongoose.Schema(
    {
        formationType: {
            type: String
        },
        formationPositions: {
            type: Map,
            of: {
                x: { type: Number },
                y: { type: Number },
                playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Athlete' }
            },
            default: {}
        },
        playersCount: {
            type: Number
        },
        trainingChecklist: [{
            activity: { type: String },
            completed: { type: Boolean, default: false }
        }],
        athletes: [{
            name: { type: String },
            position: { type: String },
            speed: { type: Number, min: 1, max: 10 },
            strength: { type: Number, min: 1, max: 10 },
            stamina: { type: Number, min: 1, max: 10 }
        }],
        performanceTrends: {
            speed: [{ type: Number, min: 1, max: 10 }],
            strength: [{ type: Number, min: 1, max: 10 }],
            stamina: [{ type: Number, min: 1, max: 10 }]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Training', trainingSchema);