const express = require('express');
const router = express.Router();
const { createDebt, getDebts, updateDebt } = require('../controllers/debtcontrollers');
const protect = require('../middlewares/authMiddleware');

router.post('/', protect, createDebt);           // POST /api/debts
router.get('/', protect, getDebts);              // GET /api/debts
router.put('/:id', protect, updateDebt);         // PUT /api/debts/:id

module.exports = router;
