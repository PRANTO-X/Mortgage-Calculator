let defaultState = document.querySelector('.default-state');
let activeState = document.querySelector('.active-state');
let amountInput = document.querySelector('#amount-input');
let yearInput = document.querySelector('#year-input');
let rateInput = document.querySelector('#rate-input');
let repaymentCheckBox = document.querySelector('#repayment');
let interestCheckBox = document.querySelector('#interest');
let mainBtn = document.querySelector('#main-btn');

// show default state
window.addEventListener('DOMContentLoaded',()=>{
    defaultState.classList.remove("hide");
    activeState.classList.add("hide");
});

// show active state
let showResult = (monthlyPayment, totalPayment) => {
    activeState.classList.remove("hide");
    defaultState.classList.add("hide");

    // show result
    document.querySelector('.monthly-repay').textContent = `£${monthlyPayment}`;
    document.querySelector('.total-repay').textContent = `£${totalPayment}`;

    // empty input
    amountInput.value = '';
    yearInput.value = '';
    rateInput.value = '';
    repaymentCheckBox.checked = false;
    interestCheckBox.checked = false;
};

// Calculate repayment
let calculateRepayment = (amount, year, rate) => {
    const monthlyRate = rate / 100 / 12; 
    const totalPayments = year * 12; 

    if (monthlyRate === 0) {
        const monthlyPayment = parseFloat((amount / totalPayments).toFixed(2));
        const totalPayment = amount;
        showResult(monthlyPayment.toLocaleString(), totalPayment.toLocaleString());
    } else {
        const monthlyPayment =parseFloat( (amount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
        (Math.pow(1 + monthlyRate, totalPayments) - 1)).toFixed(2));
            
        const totalPayment = monthlyPayment * totalPayments;

        showResult(monthlyPayment.toLocaleString(), totalPayment.toLocaleString());
    }
}

// Calculate interest
let calculateInterest = (amount, year, rate) => {
    const monthlyRate = rate / 100 / 12; 
    const monthlyPayment = parseFloat((amount * monthlyRate).toFixed(2)); 
    const totalPayments = year * 12; 
    const totalPayment = monthlyPayment * totalPayments; 

    
    showResult(monthlyPayment.toLocaleString(), totalPayment.toLocaleString());
};


// check repayment
repaymentCheckBox.addEventListener("change",()=>{
    if(repaymentCheckBox.checked){
        interestCheckBox.checked = false;
    }
});

// check interest
interestCheckBox.addEventListener("change",()=>{
    if(interestCheckBox.checked){
        repaymentCheckBox.checked = false;
    }
});

// Function to handle main btn
mainBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    // take input
    amount = amountInput.value.trim();
    year = yearInput.value.trim();
    rate = rateInput.value.trim();
    
    // remove error
    document.querySelectorAll('.error').forEach((input)=>{input.classList.remove('error')});
    document.querySelectorAll('.error-msg').forEach((msg)=>{msg.style.display = "none"});

    // check validation of input and show error
    if(amount === ''){
        amountInput.classList.add('error');
        amountInput.closest('.textarea').querySelector('.error-msg').style.display = "block";
    }
    if(year === ''){
        yearInput.classList.add('error');
        yearInput.closest('.textarea').querySelector('.error-msg').style.display = "block";
    }
    if(rate === ''){
        rateInput.classList.add('error');
        rateInput.closest('.textarea').querySelector('.error-msg').style.display = "block";
    }

    if(!repaymentCheckBox.checked && !interestCheckBox.checked){
        repaymentCheckBox.closest('.type').querySelector('.error-msg').style.display = "block";
    }

    if(amount !== '' && year !== '' && rate !== '' && (repaymentCheckBox.checked || interestCheckBox.checked)){
        if (repaymentCheckBox.checked) {
            calculateRepayment(parseFloat(amount), parseInt(year), parseFloat(rate));
        }
        if (interestCheckBox.checked) {
            calculateInterest(parseFloat(amount), parseInt(year), parseFloat(rate));
        }
    }
});

// Clear content
document.querySelector('.clear-btn').addEventListener('click',()=>{
    defaultState.classList.remove("hide");
    activeState.classList.add("hide");

    amountInput.value = '';
    yearInput.value = '';
    rateInput.value = '';
    repaymentCheckBox.checked = false;
    interestCheckBox.checked = false;
});