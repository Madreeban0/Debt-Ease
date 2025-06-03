const Checkbook = require('../models/CheckBook');


exports.addCheck = async(req,res) => {
   try{
     const {serialNumber, issueDate, transactionRef} = req.body;
    const userId = req.user.id;
    const check = await CheckBook.create({userId, serialNumber, issueDate, transactionRef});
    res.status(201).json({message: "Check logged",check});
   } catch(err){
    res.status(500).json({message: 'Error logging check', error: err.message});
   }
};

exports.getCheck = async(req,res) => {
    try{
        const check = await Checkbook.find({userId: req.user.id});
        res.status(201).json(check);
    } catch(err){
        res.status(500).json({message: 'Error fetching checks', error: err.message});
    }
};

exports.bounceCheck = async(req,res) => {
    try{
        const check = await Checkbook.findByIdAndUpdate(
            req.params.id, {status: 'bounced'}, {new:true}
        );
        if(!check) return res.status(404).json({message: 'Check not found'});
        console.log(`ALERT: Check ${check.serialNumber} has bounced for user ${check.userId}`);
        res.status(201).json({message:'Check marked as bounced', check});
    } catch(err){
        res.status(500).json({message:'Error updating check',error: err.message});
    }
};

exports.clearCheck = async(req,res) => {
    try{
        const check = await Checkbook.findByIdAndUpdate(
            req.params.id, {status: 'cleared'}, {new: true}
        );
        if(!check) return res.status(404).json({message: 'Check not found'});
        console.log(`ALERT: Check ${check.serialNumber} has cleared for user ${check.userId}`);
         res.status(201).json({message:'Check marked as cleared', check});
    } catch(err){
        res.status(500).json({message:'Error updating check', error: err.message});
    }
};