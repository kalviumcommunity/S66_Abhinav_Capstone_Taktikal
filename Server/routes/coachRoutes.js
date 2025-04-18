const express = require('express');
const coachRoutes = express.Router();
const { signup, login } = require('../controllers/coachController');

coachRoutes.post('/signup', signup);
coachRoutes.post('/login', login);

module.exports = coachRoutes;