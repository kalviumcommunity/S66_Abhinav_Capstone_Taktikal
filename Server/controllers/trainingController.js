const Athlete = require('../models/trainingModel');

const addAthlete = async (req, res) => {
    const { name, position, speed, strength, stamina } = req.body;

    try {
        const newAthlete = new Athlete({
            name,
            position,
            speed,
            strength,
            stamina
        });

        await newAthlete.save();
        res.status(201).json({ message: "Athlete added successfully", athlete: newAthlete });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addAthlete };
