const Athlete = require('../models/athleteModel');

// Add new athlete
const addAthlete = async (req, res) => {
    try {
        const { name, position, speed, strength, stamina } = req.body;

        // Validation
        if (!name || !position || !speed || !strength || !stamina) {
            return res.status(400).json({ message: 'Please provide all required fields: name, position, speed, strength, stamina' });
        }

        // Validate position
        const validPositions = ['Forward', 'Midfielder', 'Defender', 'Goalkeeper'];
        if (!validPositions.includes(position)) {
            return res.status(400).json({ message: 'Invalid position' });
        }

        // Validate stats (1-10)
        if (speed < 1 || speed > 10 || strength < 1 || strength > 10 || stamina < 1 || stamina > 10) {
            return res.status(400).json({ message: 'Speed, strength, and stamina must be between 1 and 10' });
        }

        const newAthlete = new Athlete({
            name,
            position,
            speed,
            strength,
            stamina,
            coach: req.user._id
        });

        await newAthlete.save();

        res.status(201).json({
            message: "Athlete added successfully",
            athlete: newAthlete
        });
    } catch (error) {
        console.error('Add athlete error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get all athletes for the authenticated coach
const getAllAthletes = async (req, res) => {
    try {
        const { position, search, sortBy, sortOrder } = req.query;

        let query = { coach: req.user._id, isActive: true };

        // Filter by position
        if (position && position !== 'All Positions') {
            query.position = position;
        }

        // Search functionality
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { position: { $regex: search, $options: 'i' } }
            ];
        }

        // Sorting
        let sortOptions = {};
        if (sortBy) {
            const order = sortOrder === 'desc' ? -1 : 1;
            if (sortBy === 'score') {
                // For average score, we'll sort after calculation
                sortOptions = { name: 1 };
            } else {
                sortOptions[sortBy] = order;
            }
        } else {
            sortOptions = { createdAt: -1 };
        }

        const athletes = await Athlete.find(query).sort(sortOptions);

        // Calculate average scores and sort if needed
        const athletesWithScores = athletes.map(athlete => {
            const avgScore = Math.round((athlete.speed + athlete.strength + athlete.stamina) / 3);
            return {
                ...athlete.toObject(),
                id: athlete._id, // Add id field for frontend compatibility
                averageScore: avgScore
            };
        });

        // Sort by score if requested
        if (sortBy === 'score') {
            athletesWithScores.sort((a, b) => {
                return sortOrder === 'desc' ? b.averageScore - a.averageScore : a.averageScore - b.averageScore;
            });
        }

        res.status(200).json({
            athletes: athletesWithScores
        });
    } catch (error) {
        console.error('Get athletes error:', error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get athlete by ID
const getAthleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const athlete = await Athlete.findOne({
            _id: id,
            coach: req.user._id,
            isActive: true
        });

        if (!athlete) {
            return res.status(404).json({ message: "Athlete not found" });
        }

        const athleteWithScore = {
            ...athlete.toObject(),
            id: athlete._id,
            averageScore: Math.round((athlete.speed + athlete.strength + athlete.stamina) / 3)
        };

        res.status(200).json(athleteWithScore);
    } catch (error) {
        console.error('Get athlete by ID error:', error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update athlete
const updateAthlete = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const athlete = await Athlete.findOneAndUpdate(
            { _id: id, coach: req.user._id, isActive: true },
            updateData,
            { new: true, runValidators: true }
        );

        if (!athlete) {
            return res.status(404).json({ message: "Athlete not found" });
        }

        res.status(200).json({
            message: "Athlete updated successfully",
            athlete: {
                ...athlete.toObject(),
                id: athlete._id
            }
        });
    } catch (error) {
        console.error('Update athlete error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete athlete (soft delete)
const deleteAthlete = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if this is the last athlete
        const athleteCount = await Athlete.countDocuments({
            coach: req.user._id,
            isActive: true
        });

        if (athleteCount <= 1) {
            return res.status(400).json({ message: "You must have at least one athlete in your team." });
        }

        const athlete = await Athlete.findOneAndUpdate(
            { _id: id, coach: req.user._id },
            { isActive: false },
            { new: true }
        );

        if (!athlete) {
            return res.status(404).json({ message: "Athlete not found" });
        }

        res.status(200).json({ message: "Athlete deleted successfully" });
    } catch (error) {
        console.error('Delete athlete error:', error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get athlete statistics for dashboard
const getAthleteStats = async (req, res) => {
    try {
        const coachId = req.user._id;

        const athletes = await Athlete.find({ coach: coachId, isActive: true });

        const stats = {
            total: athletes.length,
            byPosition: {
                Forward: athletes.filter(a => a.position === 'Forward').length,
                Midfielder: athletes.filter(a => a.position === 'Midfielder').length,
                Defender: athletes.filter(a => a.position === 'Defender').length,
                Goalkeeper: athletes.filter(a => a.position === 'Goalkeeper').length
            }
        };

        res.status(200).json(stats);
    } catch (error) {
        console.error('Get athlete stats error:', error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    addAthlete,
    getAllAthletes,
    getAthleteById,
    updateAthlete,
    deleteAthlete,
    getAthleteStats
};
