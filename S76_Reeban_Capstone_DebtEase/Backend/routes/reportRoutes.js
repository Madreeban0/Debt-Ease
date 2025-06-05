const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/summary',authMiddleware,reportController.summary);

module.exports = router;