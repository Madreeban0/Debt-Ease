const calculatorEMI = require('../utils/emiCalculator');

exports.calculate = async(req,res) => {
    try{
        const {principle, annualRate, tenureMonths} = req.body;
        if(!principle || !annualRate || !tenureMonths){
            res.status(404).json({message: 'Principle, Annual rate, Tenure months are required'});
        }

        if(principle<0 || annualRate<0 || tenureMonths <=0){
            res.status(404).json({message: 'Invalid value for Principle, Annual rate and Tenure months'});
        }

        const result = calculatorEMI(Number(principle), Number(annualRate), Number(tenureMonths));
        res.json(result);
    } catch(err){
        res.status(500).json({message: 'Error while calculating EMI', error: err.message});
    }
}