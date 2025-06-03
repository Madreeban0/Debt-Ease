const Repayment = require('../models/Repayment');
const Debt = require('../models/Debt');

// Add a repayment
exports.addRepayment = async (req, res) => {
  try {
    const { debtId, amountPaid, paymentMode, note } = req.body;
    const userId = req.user.id;

    const newRepayment = await Repayment.create({
      userId,
      debtId,
      amountPaid,
      paymentMode,
      note
    });

    res.status(201).json({ message: 'Repayment recorded', repayment: newRepayment });
  } catch (err) {
    res.status(500).json({ message: 'Error recording repayment', error: err.message });
  }
};

// Get all repayments for a user
exports.getUserRepayments = async (req, res) => {
  try {
    const repayments = await Repayment.find({ userId: req.user.id }).populate('debtId', 'amount dueDate');
    res.status(200).json(repayments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching repayments', error: err.message });
  }
};
