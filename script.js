let num = '';
let num1 = '';
let num2 = '';
let operator = '';
let solution = 0;

const numButtons = Array.from(document.querySelectorAll('.number'));
const operatorButtons = Array.from(document.querySelectorAll('.operator'));
const operationDisplay = document.querySelector('.display');
const clearButton = document.querySelector('.clear');
const keyButtons = document.querySelectorAll('.decimal, .percent, .sign');

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

function getNumber(char) {
    num += char;
    assignNumber(num);
    operationDisplay.textContent = cleanNumber(num);
}

function assignNumber(num) {
    if (!operator) num1 = num;
    else num2 = num;
}

function getOperator(char) {
    if (num2) solution = operate(operator, Number(num1), Number(num2));
    else solution = num1;

    if (char !== '=') operator = char;
    else operator = '';

    num1 = solution;
    num = num2 = '';
    operationDisplay.textContent = cleanNumber(solution);
}

function applyKeyButtons(char) {
    if (num === '') num = num1;
    
    if (char === '%') num *= 0.01;
    else if (char === '+/-') num *= -1;
    else if (!num.toString().includes('.')) num += '.';

    assignNumber(num);

    operationDisplay.textContent = cleanNumber(num);
}

function clear() {
    num = num1 = num2 = operator = '';
    solution = 0;
    operationDisplay.textContent = '';
}

function cleanNumber(num) {
    if (num.toString().length > 9) return parseFloat(num).toExponential(1);
    else return num;
}

numButtons.forEach((button) => {button.addEventListener('click', () => getNumber(button.textContent))});

keyButtons.forEach((button) => button.addEventListener('click', () => applyKeyButtons(button.textContent)));

operatorButtons.forEach((button) => {button.addEventListener('click', () => getOperator(button.textContent))});

clearButton.addEventListener('click', clear);

// document.addEventListener('keydown', (event) => {
//         if (event.key >= 0 || event.key <= 9) { //|| event.target.value === '.' || event.target.value === '%' || event.target.value === '+/-') {
//             getNumber(event.key);
//         }
// });