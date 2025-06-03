const mongoose = require('mongoose');

const checkBookSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    serialNumber :{type: String, required: true, unique: true},
    issueDate: {type: Date, required: true},
    status: {type: String, enum:['issued','cleared','bounced'], required: true},
    transactionRef: {type: String},
},{timestamps: true});

module.export = mongoose.model('Checkbook', checkBookSchema);