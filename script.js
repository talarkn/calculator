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

const numButtons = Array.from(document.querySelectorAll('.number'));
const operatorButtons = Array.from(document.querySelectorAll('.operator'));
const point = document.querySelector('.point');
const operationDisplay = document.querySelector('.display');
const clearButton = document.querySelector('.clear');

let num1 = '';
let num2 = '';
let operator = '';
let solution = 0;

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!operator) {
            num1 += button.value;
            operationDisplay.textContent = num1;
        }
        else { 
            num2 += button.value;
            operationDisplay.textContent = num2;
        }
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (num2) solution = operate(operator, Number(num1), Number(num2)).toFixed(2);
        else solution = num1;
        if (button.value !== '=') operator = button.value;
        num1 = solution;
        num2 = '';
        operationDisplay.textContent = solution;
    });
});

function allowDecimal(num) {
    return num.includes(',');
}

clearButton.addEventListener('click', () => {
    operationDisplay.textContent = '';
    num1 = num2 = operator = '';
    solution = 0;
});