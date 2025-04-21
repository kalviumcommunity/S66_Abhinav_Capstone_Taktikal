const express = require('express');
const athleteRoutes = express.Router();
const { addAthlete, getAllAthletes, getAthleteById  } = require('../controllers/athleteController');

athleteRoutes.post('/addAthlete', addAthlete);
athleteRoutes.get('/', getAllAthletes);
athleteRoutes.get('/:id', getAthleteById);   


module.exports = athleteRoutes;
