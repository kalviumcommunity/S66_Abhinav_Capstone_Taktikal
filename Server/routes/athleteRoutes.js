const express = require('express');
const athleteRoutes = express.Router();
const { addAthlete, getAllAthletes, getAthleteById, deleteAthlete } = require('../controllers/athleteController');

athleteRoutes.post('/addAthlete', addAthlete);
athleteRoutes.get('/', getAllAthletes);
athleteRoutes.get('/:id', getAthleteById);
athleteRoutes.delete('/:id', deleteAthlete);   


module.exports = athleteRoutes;
