const Debt = require('../models/Debt');

// Create a new debt
exports.createDebt = async (req, res) => {
  try {
    const { amount, interestRate, dueDate } = req.body;
    const userId = req.user.id;

    const newDebt = await Debt.create({ userId, amount, interestRate, dueDate });
    res.status(201).json({ message: 'Debt created', debt: newDebt });
  } catch (err) {
    res.status(500).json({ message: 'Error creating debt', error: err.message });
  }
};

// Get all debts for a user
exports.getDebts = async (req, res) => {
  try {
    const debts = await Debt.find({ userId: req.user.id });
    res.status(200).json(debts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching debts', error: err.message });
  }
};

// Update debt & check for discrepancies
exports.updateDebt = async (req, res) => {
  try {
    const existingDebt = await Debt.findById(req.params.id);
    if (!existingDebt) return res.status(404).json({ message: 'Debt not found' });

    const { interestRate } = req.body;
    const discrepancy = existingDebt.interestRate !== interestRate;

    const updatedDebt = await Debt.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      message: discrepancy ? 'Debt updated with interest rate change ⚠️' : 'Debt updated',
      updatedDebt
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating debt', error: err.message });
  }
};
