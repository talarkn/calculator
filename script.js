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
    if (!operator) {
        num1 += event.target.value;
        operationDisplay.textContent = num1;
    }
    else { 
        num2 += event.target.value;
        operationDisplay.textContent = num2;
    }
}

function getOperator(event) {
    if (num2) solution = operate(operator, Number(num1), Number(num2));
    else solution = num1;
    if (event.target.value !== '=') operator = event.target.value;
    num1 = solution;
    num2 = '';
    operationDisplay.textContent = solution;
}

function clear() {
    num1 = num2 = operator = '';
    solution = 0;
    operationDisplay.textContent = '';
}

const numButtons = Array.from(document.querySelectorAll('.number'));
const operatorButtons = Array.from(document.querySelectorAll('.operator'));
const point = document.querySelector('.point');
const operationDisplay = document.querySelector('.display');
const clearButton = document.querySelector('.clear');

let num1 = '';
let num2 = '';
let operator = '';
let solution = 0;

numButtons.forEach((button) => {button.addEventListener('click', getNumber)});

operatorButtons.forEach((button) => {button.addEventListener('click', getOperator)});

clearButton.addEventListener('click', clear);

function allowDecimal(num) {
    return num.includes(',');
}
