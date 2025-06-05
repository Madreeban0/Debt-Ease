const Debt = require('../models/Debt');
const Repayment = require('../models/Repayment');
const checkBook = require('../models/CheckBook');

exports.summary = async(req,res) => {
    try{
        const userId = req.user.id;

        const debts = await Debt.find({userId});
        const totalDebt = debts.reduce((sum,d) => sum + d.amount,0);

        const repaid = await Repayment.find({userId});
        const totalRepayment = repaid.reduce((sum,r) => sum+r.amountPaid,0);

        const outstanding = totalDebt-totalRepayment;

        const now = new Date();
        const upcomingDues = debts.filter(debt => {
            const due = new Date(debt.dueDate);
            const dues = due > now && due<new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            return dues;
        });

        const bouncedCheck = await checkBook.countDocuments({userId, status: 'bounced'});

        res.json({
            totalDebt,
            totalRepayment,
            outstanding,
            upcomingDues,
            bouncedCheck
        });
    } catch(err){
        res.status(500).json({message: 'Error generating report', error: err.message});
    }
};