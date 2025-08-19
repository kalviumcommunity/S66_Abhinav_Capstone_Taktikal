const Performance = require('../models/performanceModel');

// Get performance data for dashboard chart
const getPerformanceData = async (req, res) => {
    try {
        const coachId = req.user._id;
        
        // Get performance data for the coach, sorted by week
        let performanceData = await Performance.find({ coach: coachId })
            .sort({ week: 1 });

        // If no data exists, create default data
        if (performanceData.length === 0) {
            const defaultData = [
                { week: "Week 1", speed: 5, strength: 6, endurance: 4, technique: 6 },
                { week: "Week 2", speed: 6, strength: 6.2, endurance: 5, technique: 6.1 },
                { week: "Week 3", speed: 6.5, strength: 7, endurance: 5.8, technique: 6.3 },
                { week: "Week 4", speed: 7, strength: 7.1, endurance: 6.2, technique: 6.5 },
                { week: "Week 5", speed: 7.4, strength: 8, endurance: 6.5, technique: 6.8 },
                { week: "Week 6", speed: 8, strength: 8, endurance: 7, technique: 7 }
            ];

            // Create default performance records
            for (const data of defaultData) {
                await Performance.create({
                    coach: coachId,
                    ...data
                });
            }

            performanceData = await Performance.find({ coach: coachId }).sort({ week: 1 });
        }

        // Format data for frontend
        const formattedData = performanceData.map(item => ({
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
        console.error('Get performance data error:', error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update performance data
const updatePerformanceData = async (req, res) => {
    try {
        const coachId = req.user._id;
        const { performanceData } = req.body;

        if (!performanceData || !Array.isArray(performanceData)) {
            return res.status(400).json({ message: 'Invalid performance data format' });
        }

        // Delete existing performance data for this coach
        await Performance.deleteMany({ coach: coachId });

        // Create new performance records
        const newRecords = [];
        for (const data of performanceData) {
            const record = await Performance.create({
                coach: coachId,
                week: data.week,
                speed: data.speed,
                strength: data.strength,
                endurance: data.endurance,
                technique: data.technique
            });
            newRecords.push(record);
        }

        // Format response data
        const formattedData = newRecords.map(item => ({
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
        console.error('Update performance data error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Add single performance record
const addPerformanceRecord = async (req, res) => {
    try {
        const coachId = req.user._id;
        const { week, speed, strength, endurance, technique } = req.body;

        // Validation
        if (!week || speed === undefined || strength === undefined || endurance === undefined || technique === undefined) {
            return res.status(400).json({ message: 'Please provide all required fields: week, speed, strength, endurance, technique' });
        }

        // Check if record for this week already exists
        const existingRecord = await Performance.findOne({ coach: coachId, week });
        
        if (existingRecord) {
            // Update existing record
            existingRecord.speed = speed;
            existingRecord.strength = strength;
            existingRecord.endurance = endurance;
            existingRecord.technique = technique;
            await existingRecord.save();

            res.status(200).json({
                message: 'Performance record updated successfully',
                record: {
                    week: existingRecord.week,
                    speed: existingRecord.speed,
                    strength: existingRecord.strength,
                    endurance: existingRecord.endurance,
                    technique: existingRecord.technique
                }
            });
        } else {
            // Create new record
            const newRecord = await Performance.create({
                coach: coachId,
                week,
                speed,
                strength,
                endurance,
                technique
            });

            res.status(201).json({
                message: 'Performance record added successfully',
                record: {
                    week: newRecord.week,
                    speed: newRecord.speed,
                    strength: newRecord.strength,
                    endurance: newRecord.endurance,
                    technique: newRecord.technique
                }
            });
        }
    } catch (error) {
        console.error('Add performance record error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPerformanceData,
    updatePerformanceData,
    addPerformanceRecord
};
