let num1 = '';
let num2 = '';
let operator = '';
let solution = 0;

const numButtons = Array.from(document.querySelectorAll('.number'));
const operatorButtons = Array.from(document.querySelectorAll('.operator'));
const operationDisplay = document.querySelector('.display');
const clearButton = document.querySelector('.clear');
const decimal = document.querySelector('.decimal');

function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    if (operator === '+') return add(num1, num2);
    if (operator === '-') return substract(num1, num2);
    if (operator === '*') return multiply(num1, num2);
    if (operator === '/') return divide(num1, num2);
}

function getNumber(event) {
    let displayedNum;
    
    if (!operator) displayedNum = num1 = addDigit(event, num1);
    else displayedNum = num2 = addDigit(event, num2);

    operationDisplay.textContent = displayedNum;
    decimal.value = '.';
}

function addDigit(event, num) {
    if (num.toString().includes('.')) decimal.value = '';
    else if (num === '' && event.target.value === '.') num = 0;

    if (event.target.value === '%') num *= 0.01; 
    else if (event.target.value === '+/-') num *= -1;
    else if (num !== 'Infinity') num += event.target.value;

    return num === 0 ? '' : cleanNumber(num);
}

function getOperator(event) {
    if (num2) solution = operate(operator, Number(num1), Number(num2));
    else solution = num1;

    if (event.target.value !== '=') operator = event.target.value;
    else operator = '';

    num1 = solution;
    num2 = '';
    operationDisplay.textContent = cleanNumber(solution);
}

function clear() {
    num1 = num2 = operator = '';
    solution = 0;
    operationDisplay.textContent = '';
}

function cleanNumber(num) {
    if (num.toString().length > 9) return parseFloat(num).toExponential(1);
    else return num;
}

numButtons.forEach((button) => {button.addEventListener('click', getNumber)});

operatorButtons.forEach((button) => {button.addEventListener('click', getOperator)});

clearButton.addEventListener('click', clear);