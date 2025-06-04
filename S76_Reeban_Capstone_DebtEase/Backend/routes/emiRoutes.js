const express = require('express');
const router = express.Router();
const emiCalculator = require('../controllers/emiController');

router.post('/calculate-emi', emiCalculator.calculate);

module.exports = router;