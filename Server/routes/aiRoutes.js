const express = require('express');
const { protect } = require('../middleware/auth');
const { chatWithAssistant } = require('../controllers/aiController');

const aiRoutes = express.Router();

// Protected AI chat endpoint
aiRoutes.post('/chat', protect, chatWithAssistant);

module.exports = aiRoutes;
