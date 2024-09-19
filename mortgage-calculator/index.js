(()=>{
    'use strict';

    const inputs = document.querySelectorAll('.input-boxes input');
    const form = document.querySelector('#form');
    const clearBtn = document.querySelector('.clear-btn');
    const calculateBtn = document.querySelector('.calculate-btn');
    const amount = document.querySelector('#amount');
    const term = document.querySelector('#term');
    const rate = document.querySelector('#rate');

    let mortage = {};

    // clear button
    clearBtn.addEventListener('click', ()=>{
        inputs.forEach(input => {
            input.value = '';
        });
    });

    
    // calculate button
    calculateBtn.addEventListener('click', (e)=>{
        e.preventDefault();

        const amountValue = parseFloat(amount.value);
        const termValue = parseInt(term.value);
        const rateValue = parseFloat(rate.value);

    

        let isValid = true;

        // validate for empty input values
        inputs.forEach(input => {
           const value = input.value;
           const parent = input.parentElement;
           const error = parent.querySelector('.error-message');

           if(!value){
            isValid = false;
            input.classList.add('error');
            error.style.display = 'block';
           }
        });

        // getting radio types
        const radioTypes = form.typeCalculation;
        radioTypes.forEach(radio => {
           if(radio.checked){
            let monthlyPayment;
            if(radio.id === "repayment"){
                const monthlyInterestRate = rateValue / 100 / 12;
                const numberOfPayments = termValue * 12;
                monthlyPayment = (amountValue * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                                 (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

                document.querySelector('#monthly-payment').textContent = `$ ${monthlyPayment.toFixed(2)}`;

                document.querySelector('#total-repayment').textContent = `$ ${numberOfPayments * monthlyInterestRate}`;
            }else{
                console.log('interest')
            }
           }else{
            document.querySelector('.radio-groups .error-message').style.display = 'block';
           }
        });
    });

})();