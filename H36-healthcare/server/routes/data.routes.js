const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const dataController = require('../controllers/data.controller');

router.get('/summary-chart', authMiddleware, dataController.summary_data);

router.get('/reports-chart', authMiddleware, dataController.reports_data);

module.exports = router;