let num = '';
let num1 = '';
let num2 = '';
let operator = '';
let solution = 0;

const numButtons = Array.from(document.querySelectorAll('.number'));
const operatorButtons = Array.from(document.querySelectorAll('.operator'));
const operationDisplay = document.querySelector('.display-text');
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
    resetBackgroundColor();
    num += char;
    assignNumber(num);
    operationDisplay.textContent = cleanNumber(num);
}

function assignNumber(num) {
    if (!operator) num1 = num;
    else num2 = num;
}

function getOperator(char) {
    resetBackgroundColor();
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
    else if (!num.toString().includes('.')) {
        if (num === '') num = '0.';
        else num += '.';
    }

    if (num === 0) num = '';

    assignNumber(num);
    operationDisplay.textContent = cleanNumber(num);
}

function clear() {
    num = num1 = num2 = operator = '';
    solution = 0;
    operationDisplay.textContent = '';
    resetBackgroundColor();
}

function cleanNumber(num) {
    if (num.toString().length > 9) return parseFloat(num).toExponential(1);
    else return num;
}

function lightenBackgroundColor(event) {
    operatorButtons.forEach((button) => {
        if (event === button.value) button.classList.toggle('lighter-operator');
    });
}

function resetBackgroundColor() {
    operatorButtons.forEach((button) => {
        if (button.classList.contains('lighter-operator')) button.classList.toggle('lighter-operator');
    });
}

numButtons.forEach((button) => {button.addEventListener('click', () => getNumber(button.textContent))});

keyButtons.forEach((button) => {button.addEventListener('click', () => applyKeyButtons(button.textContent))});

operatorButtons.forEach((button) => {button.addEventListener('click', () => {
    getOperator(button.textContent);
    lightenBackgroundColor(button.value);
    });
});

clearButton.addEventListener('click', clear);

document.addEventListener('keydown', (event) => {
        if (event.key >= 0 || event.key <= 9) getNumber(event.key);
        if (event.key === '.' || event.key === '%') applyKeyButtons(event.key);
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') applyKeyButtons('+/-');
        if (event.key === 'Escape') clear();
        if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' || event.key === '=') {
            getOperator(event.key);
            lightenBackgroundColor(event.key);
        }
        if (event.key === 'Enter') {
            getOperator('=');
            lightenBackgroundColor('=');
        }
});