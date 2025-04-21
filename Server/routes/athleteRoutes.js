const express = require('express');
const athleteRoutes = express.Router();
const { addAthlete, getAllAthletes, getAthleteById, updateAthlete } = require('../controllers/athleteController');

athleteRoutes.post('/addAthlete', addAthlete);
athleteRoutes.get('/', getAllAthletes);
athleteRoutes.get('/:id', getAthleteById);
athleteRoutes.put('/:id', updateAthlete);   


module.exports = athleteRoutes;
