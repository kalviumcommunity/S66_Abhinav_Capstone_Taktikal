const express = require('express');
const { protect } = require('../middleware/auth');
const {
    addAthlete,
    getAllAthletes,
    getAthleteById,
    updateAthlete,
    deleteAthlete,
    getAthleteStats
} = require('../controllers/athleteController');

const athleteRoutes = express.Router();

// All routes are protected (require authentication)
athleteRoutes.post('/add', protect, addAthlete);
athleteRoutes.get('/all', protect, getAllAthletes);
athleteRoutes.get('/stats', protect, getAthleteStats);
athleteRoutes.get('/:id', protect, getAthleteById);
athleteRoutes.put('/:id', protect, updateAthlete);
athleteRoutes.delete('/:id', protect, deleteAthlete);

module.exports = athleteRoutes;
