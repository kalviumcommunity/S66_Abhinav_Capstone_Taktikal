const Athlete = require('../models/athleteModel');

// Helper to escape regex special characters for NoSQL search queries
const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

// Add new athlete
const addAthlete = async (req, res) => {
    try {
        const { name, position, speed, strength, stamina } = req.body;

        if (!name || !position || speed === undefined || strength === undefined || stamina === undefined) {
            return res.status(400).json({ message: 'Please provide all required fields: name, position, speed, strength, stamina' });
        }

        const validPositions = [
            'Forward', 'Midfielder', 'Defender', 'Goalkeeper', // Football
            'Batsman', 'Bowler', 'All-Rounder', 'Wicketkeeper', // Cricket
            'Setter', 'Libero', 'Middle Blocker', 'Outside Hitter', 'Opposite Hitter', // Volleyball
            'Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center', // Basketball
            'Left Wing', 'Right Wing', 'Pivot', 'Left Back', 'Right Back', // Handball
            'Prop', 'Hooker', 'Lock', 'Flanker', 'Number 8', 'Scrum-half', 'Fly-half', 'Centre', 'Wing', 'Fullback', // Rugby
            'Grandmaster Candidate', 'Blitz Specialist', 'Endgame Strategist', 'Opening Analyst', 'Tactical Solver', // Chess
            'Attacker', 'Defensive Chopper', 'Serve Specialist', 'Doubles Partner', // Table Tennis
            'Singles Specialist', 'Doubles Specialist', 'Net Specialist', 'Smash Specialist' // Badminton
        ];
        if (!validPositions.includes(position)) {
            return res.status(400).json({ message: 'Invalid position/role specified' });
        }

        const speedNum = Number(speed);
        const strengthNum = Number(strength);
        const staminaNum = Number(stamina);

        if (speedNum < 1 || speedNum > 10 || strengthNum < 1 || strengthNum > 10 || staminaNum < 1 || staminaNum > 10) {
            return res.status(400).json({ message: 'Speed, strength, and stamina must be numbers between 1 and 10' });
        }

        const newAthlete = new Athlete({
            name: name.trim(),
            position,
            speed: speedNum,
            strength: strengthNum,
            stamina: staminaNum,
            coach: req.user._id
        });

        await newAthlete.save();

        res.status(201).json({
            message: 'Athlete added successfully',
            athlete: {
                ...newAthlete.toObject(),
                id: newAthlete._id,
                averageScore: Math.round((newAthlete.speed + newAthlete.strength + newAthlete.stamina) / 3)
            }
        });
    } catch (error) {
        console.error('Add athlete error:', error.message);
        res.status(500).json({ message: 'Failed to add athlete' });
    }
};

// Get all athletes for authenticated coach (with NoSQL injection protection, whitelist sorting, and pagination)
const getAllAthletes = async (req, res) => {
    try {
        const { position, search, sortBy, sortOrder, page = 1, limit = 50 } = req.query;

        let query = { coach: req.user._id, isActive: true };

        // Position filter
        if (position && position !== 'All Positions') {
            query.position = position;
        }

        // Sanitized NoSQL search
        if (search && search.trim() !== '') {
            const cleanSearch = escapeRegex(search.trim());
            query.$or = [
                { name: { $regex: cleanSearch, $options: 'i' } },
                { position: { $regex: cleanSearch, $options: 'i' } }
            ];
        }

        // Whitelisted sort parameters
        const allowedSortFields = ['name', 'position', 'speed', 'strength', 'stamina', 'createdAt', 'score'];
        const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
        const order = sortOrder === 'desc' ? -1 : 1;

        let sortOptions = {};
        if (safeSortBy !== 'score') {
            sortOptions[safeSortBy] = order;
        }

        const pageNum = Math.max(1, parseInt(page) || 1);
        const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 50));
        const skip = (pageNum - 1) * limitNum;

        const total = await Athlete.countDocuments(query);
        const athletes = await Athlete.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum);

        let athletesWithScores = athletes.map(athlete => {
            const avgScore = Math.round((athlete.speed + athlete.strength + athlete.stamina) / 3);
            return {
                ...athlete.toObject(),
                id: athlete._id,
                averageScore: avgScore
            };
        });

        // Sort by calculated average score if requested
        if (safeSortBy === 'score') {
            athletesWithScores.sort((a, b) => {
                return order === -1 ? b.averageScore - a.averageScore : a.averageScore - b.averageScore;
            });
        }

        res.status(200).json({
            athletes: athletesWithScores,
            pagination: {
                total,
                page: pageNum,
                pages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        console.error('Get athletes error:', error.message);
        res.status(500).json({ message: 'Server Error fetching athletes' });
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
            return res.status(404).json({ message: 'Athlete not found' });
        }

        res.status(200).json({
            ...athlete.toObject(),
            id: athlete._id,
            averageScore: Math.round((athlete.speed + athlete.strength + athlete.stamina) / 3)
        });
    } catch (error) {
        console.error('Get athlete by ID error:', error.message);
        res.status(500).json({ message: 'Server Error fetching athlete' });
    }
};

// Update athlete
const updateAthlete = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, speed, strength, stamina } = req.body;

        const updateFields = {};
        if (name !== undefined) updateFields.name = name.trim();
        if (position !== undefined) updateFields.position = position;
        if (speed !== undefined) updateFields.speed = Number(speed);
        if (strength !== undefined) updateFields.strength = Number(strength);
        if (stamina !== undefined) updateFields.stamina = Number(stamina);

        const athlete = await Athlete.findOneAndUpdate(
            { _id: id, coach: req.user._id, isActive: true },
            updateFields,
            { new: true, runValidators: true }
        );

        if (!athlete) {
            return res.status(404).json({ message: 'Athlete not found' });
        }

        res.status(200).json({
            message: 'Athlete updated successfully',
            athlete: {
                ...athlete.toObject(),
                id: athlete._id,
                averageScore: Math.round((athlete.speed + athlete.strength + athlete.stamina) / 3)
            }
        });
    } catch (error) {
        console.error('Update athlete error:', error.message);
        res.status(500).json({ message: 'Failed to update athlete' });
    }
};

// Delete athlete (soft delete)
const deleteAthlete = async (req, res) => {
    try {
        const { id } = req.params;

        const athleteCount = await Athlete.countDocuments({
            coach: req.user._id,
            isActive: true
        });

        if (athleteCount <= 1) {
            return res.status(400).json({ message: 'You must have at least one athlete in your team.' });
        }

        const athlete = await Athlete.findOneAndUpdate(
            { _id: id, coach: req.user._id },
            { isActive: false },
            { new: true }
        );

        if (!athlete) {
            return res.status(404).json({ message: 'Athlete not found' });
        }

        res.status(200).json({ message: 'Athlete deleted successfully' });
    } catch (error) {
        console.error('Delete athlete error:', error.message);
        res.status(500).json({ message: 'Server Error deleting athlete' });
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
        console.error('Get athlete stats error:', error.message);
        res.status(500).json({ message: 'Server Error fetching stats' });
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
