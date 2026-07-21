const Performance = require('../models/performanceModel');

// Get performance data for dashboard chart
const getPerformanceData = async (req, res) => {
    try {
        const coachId = req.user._id;
        
        let performanceData = await Performance.find({ coach: coachId })
            .sort({ week: 1 });

        // Default data initialization if none exists
        if (performanceData.length === 0) {
            const defaultData = [
                { week: "Week 1", speed: 5, strength: 6, endurance: 4, technique: 6 },
                { week: "Week 2", speed: 6, strength: 6.2, endurance: 5, technique: 6.1 },
                { week: "Week 3", speed: 6.5, strength: 7, endurance: 5.8, technique: 6.3 },
                { week: "Week 4", speed: 7, strength: 7.1, endurance: 6.2, technique: 6.5 },
                { week: "Week 5", speed: 7.4, strength: 8, endurance: 6.5, technique: 6.8 },
                { week: "Week 6", speed: 8, strength: 8, endurance: 7, technique: 7 }
            ];

            const docsToInsert = defaultData.map(d => ({ coach: coachId, ...d }));
            await Performance.insertMany(docsToInsert);
            performanceData = await Performance.find({ coach: coachId }).sort({ week: 1 });
        }

        const formattedData = performanceData.map(item => ({
            id: item._id,
            week: item.week,
            speed: item.speed,
            strength: item.strength,
            endurance: item.endurance,
            technique: item.technique
        }));

        res.status(200).json({
            performanceData: formattedData
        });
    } catch (error) {
        console.error('Get performance data error:', error.message);
        res.status(500).json({ message: "Server Error fetching performance data" });
    }
};

// Update performance data atomically using bulkOps / bulkWrite
const updatePerformanceData = async (req, res) => {
    try {
        const coachId = req.user._id;
        const { performanceData } = req.body;

        if (!performanceData || !Array.isArray(performanceData)) {
            return res.status(400).json({ message: 'Invalid performance data format' });
        }

        // Validate each item
        for (const data of performanceData) {
            if (!data.week || data.speed === undefined || data.strength === undefined || data.endurance === undefined || data.technique === undefined) {
                return res.status(400).json({ message: 'Each week entry must contain week, speed, strength, endurance, and technique' });
            }
        }

        // Perform bulk upsert operations atomically per week to prevent data wipeout on partial failures
        const bulkOps = performanceData.map(data => ({
            updateOne: {
                filter: { coach: coachId, week: data.week },
                update: {
                    $set: {
                        speed: Number(data.speed),
                        strength: Number(data.strength),
                        endurance: Number(data.endurance),
                        technique: Number(data.technique)
                    }
                },
                upsert: true
            }
        }));

        await Performance.bulkWrite(bulkOps);

        const updatedRecords = await Performance.find({ coach: coachId }).sort({ week: 1 });

        const formattedData = updatedRecords.map(item => ({
            id: item._id,
            week: item.week,
            speed: item.speed,
            strength: item.strength,
            endurance: item.endurance,
            technique: item.technique
        }));

        res.status(200).json({
            message: 'Performance data updated successfully',
            performanceData: formattedData
        });
    } catch (error) {
        console.error('Update performance data error:', error.message);
        res.status(500).json({ message: "Server error updating performance data" });
    }
};

// Add single performance record
const addPerformanceRecord = async (req, res) => {
    try {
        const coachId = req.user._id;
        const { week, speed, strength, endurance, technique } = req.body;

        if (!week || speed === undefined || strength === undefined || endurance === undefined || technique === undefined) {
            return res.status(400).json({ message: 'Please provide all required fields: week, speed, strength, endurance, technique' });
        }

        const record = await Performance.findOneAndUpdate(
            { coach: coachId, week },
            {
                speed: Number(speed),
                strength: Number(strength),
                endurance: Number(endurance),
                technique: Number(technique)
            },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({
            message: 'Performance record saved successfully',
            record: {
                id: record._id,
                week: record.week,
                speed: record.speed,
                strength: record.strength,
                endurance: record.endurance,
                technique: record.technique
            }
        });
    } catch (error) {
        console.error('Add performance record error:', error.message);
        res.status(500).json({ message: "Server error saving performance record" });
    }
};

module.exports = {
    getPerformanceData,
    updatePerformanceData,
    addPerformanceRecord
};
