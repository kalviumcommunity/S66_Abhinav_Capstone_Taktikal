const Coach = require('../models/coachModel');
const bcrypt = require('bcryptjs')

const signup = async (req, res) => {
    try {
        const { name, email, password, age, sport } = req.body;

        const existingCoach = await Coach.findOne({ email });
        if (existingCoach) {
            return res.status(400).json({ message: "Coach with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newCoach = new Coach({
            name,
            email,
            password: hashedPassword,
            age,
            sport
        });

        await newCoach.save();
        res.status(201).json({ message: "Coach registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const coach = await Coach.findOne({ email });
        if (!coach) {
            return res.status(404).json({ message: "Coach not found" });
        }

        const isMatch = await bcrypt.compare(password, coach.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login };
