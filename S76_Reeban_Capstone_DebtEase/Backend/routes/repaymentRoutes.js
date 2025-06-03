const express = require('express');
const router = express.Router();
const { addRepayment, getUserRepayments } = require('../controllers/repaymentController');
const protect = require('../middlewares/authMiddleware');

router.post('/', protect, addRepayment);               // POST /api/repayments
router.get('/', protect, getUserRepayments);            // GET /api/repayments

module.exports = router;
