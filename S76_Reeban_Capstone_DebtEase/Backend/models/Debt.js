const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'paid', 'overdue'], default: 'active' },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Debt', debtSchema);
