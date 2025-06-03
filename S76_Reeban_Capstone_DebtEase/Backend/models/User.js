const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    email: {
        type : String,
        required : true,
        unique : true
    },
    password : String,
    googleId : String,
    debts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Debt'}],
    checkBooks: [{type: mongoose.Schema.Types.ObjectId, ref: 'checkbook'}],
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);