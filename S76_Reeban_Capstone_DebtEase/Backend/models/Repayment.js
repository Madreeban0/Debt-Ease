const mongoose = require('mongoose');

const repaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  debtId: { type: mongoose.Schema.Types.ObjectId, ref: 'Debt', required: true },
  amountPaid: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMode: { type: String, enum: ['cash', 'card', 'bank transfer', 'upi'], default: 'bank transfer' },
  note: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Repayment', repaymentSchema);
