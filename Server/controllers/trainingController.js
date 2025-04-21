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


const getAllAthletes = async (req, res) => {
    try {
        const athletes = await Athlete.find();
        res.status(200).json(athletes);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


const getAthleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const athlete = await Athlete.findById(id);
        if (!athlete) {
        return res.status(404).json({ message: "Athlete not found" });
        }
        res.status(200).json(athlete);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { addAthlete, getAllAthletes, getAthleteById  };
