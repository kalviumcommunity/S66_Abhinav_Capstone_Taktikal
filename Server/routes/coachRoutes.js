const express = require('express');
const coachRoutes = express.Router();
const { signup, login, getCoach } = require('../controllers/coachController');

coachRoutes.post('/signup', signup);
coachRoutes.post('/login', login);
coachRoutes.get('/', getCoach);

module.exports = coachRoutes;