const express = require('express');
const trainingRoutes = express.Router();
const { addAthlete, getAllAthletes, getAthleteById  } = require('../controllers/trainingController');

trainingRoutes.post('/addAthlete', addAthlete);
trainingRoutes.get('/', getAllAthletes);
trainingRoutes.get('/:id', getAthleteById);   


module.exports = trainingRoutes;
