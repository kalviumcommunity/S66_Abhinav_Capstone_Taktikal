const mongoose = require('mongoose');

const performanceSchema = mongoose.Schema(
    {
        coach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Coach',
            required: true
        },
        week: {
            type: String,
            required: true
        },
        speed: {
            type: Number,
            min: 0,
            max: 10,
            required: true
        },
        strength: {
            type: Number,
            min: 0,
            max: 10,
            required: true
        },
        endurance: {
            type: Number,
            min: 0,
            max: 10,
            required: true
        },
        technique: {
            type: Number,
            min: 0,
            max: 10,
            required: true
        }
    },
    { timestamps: true }
);

// Indexes for better performance
performanceSchema.index({ coach: 1, week: 1 });

module.exports = mongoose.model('Performance', performanceSchema);
