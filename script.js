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

let num1 = '';
let num2 = '';
let operator = '';
let solution = 0;

const numButtons = Array.from(document.querySelectorAll('.number'));
const operatorButtons = Array.from(document.querySelectorAll('.operator'));
const point = document.querySelector('.point');
const operationDisplay = document.querySelector('.display');
const clearButton = document.querySelector('.clear');
const decimal = document.querySelector('.decimal');

operationDisplay.textContent = 0;

function getNumber(event) {
    if (!operator) {
        num1 = addDigit(event, num1);
        operationDisplay.textContent = roundSolution(num1);
    }
    else {
        num2 = addDigit(event, num2);
        operationDisplay.textContent = roundSolution(num2);
    }
    decimal.value = '.';
}
// % or +/- applies after calculation is resulting in empty string -> check num2
function addDigit(event, num) {
    if (num.toString().includes('.')) decimal.value = '';
    else if (num === '' && event.target.value === '.') num = 0;

    if (event.target.value === '%') num *= 0.01; 
    else if (event.target.value === '+/-') num *= -1;
    else num += event.target.value;

    return num === 0 ? '' : num;
}

function getOperator(event) {
    if (num2) solution = operate(operator, Number(num1), Number(num2));
    else solution = num1;
    if (event.target.value !== '=') operator = event.target.value;
    num1 = solution;
    num2 = '';
    operationDisplay.textContent = roundSolution(solution);
}

function clear() {
    num1 = num2 = operator = '';
    solution = 0;
    operationDisplay.textContent = 0;
}

function roundSolution(solution) {
    if (solution.toString().length > 9) return Number(solution).toExponential(3);
    else return solution;
}

numButtons.forEach((button) => {button.addEventListener('click', getNumber)});

operatorButtons.forEach((button) => {button.addEventListener('click', getOperator)});

clearButton.addEventListener('click', clear);