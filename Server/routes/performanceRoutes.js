const express = require('express');
const { protect } = require('../middleware/auth');
const {
    getPerformanceData,
    updatePerformanceData,
    addPerformanceRecord
} = require('../controllers/performanceController');

const router = express.Router();

// All routes are protected (require authentication)
router.get('/data', protect, getPerformanceData);
router.put('/data', protect, updatePerformanceData);
router.post('/record', protect, addPerformanceRecord);

module.exports = router;
