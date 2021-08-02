const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
   //replace current display value if first val entered
   if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
   }
   else{
        // if current display value = 0 => replace, if not => add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
   }
}

function addDecimal(){
    if (awaitingNextValue) return;
    //if no decimal => add one
    if (!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    //prevent multille operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    //assign value is no value
    if (!firstValue){
        firstValue = currentValue;
    }
    else{
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    //ready for next value
    awaitingNextValue = true;
    operatorValue = operator;
}

// reset all values, display
function resetAll(){
    
    let firstValue = 0;
    let operatorValue = '';
    let awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Add event listeners for number, operators, decimal
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
    }   
    else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    }
    else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () => addDecimal())
    }
});



// event listener
clearBtn.addEventListener('click', resetAll);