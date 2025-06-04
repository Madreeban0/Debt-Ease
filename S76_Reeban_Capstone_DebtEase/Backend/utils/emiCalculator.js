function calculatorEMI(principle,annulRate,tenureMonths){
    const monthlyRate = (annualRate/12)/100;
    const n=tenureMonths;

    const emi = principle*monthlyRate*Math.pow(1+monthlyRate,n) / (Math.pow(1+monthlyRate,n)-1);
    const totalPayment = emi*n;
    const totalIntrest = totalPayment - principle;

    return{
        emi: parseFloat(emi.toFixed(2)),
        totalPayment: parseFloat(totalPayment.toFixed(2)),
        totalIntrest: parseFloat(totalIntrest.toFixed(2))
    };
}

module.exports = calculatorEMI;