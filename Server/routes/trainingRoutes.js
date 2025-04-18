const express = require('express');
const trainingRoutes = express.Router();
const { addAthlete } = require('../controllers/trainingController');

trainingRoutes.post('/addAthlete', addAthlete);

module.exports = trainingRoutes;
