const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  debtId: { type: mongoose.Schema.Types.ObjectId, ref: 'Debt', required: true },
  fileUrl: { type: String, required: true },
  fileName: String
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
