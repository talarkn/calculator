let currentNumber = '';
let firstNumber = '';
let secondNumber = '';
let operator = '';
let solution = 0;

const numButtons = Array.from(document.querySelectorAll('.number'));
const operatorButtons = Array.from(document.querySelectorAll('.operator'));
const operationDisplay = document.querySelector('.display-text');
const clearButton = document.querySelector('.clear');
const keyButtons = document.querySelectorAll('.decimal, .percent, .sign');

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function substract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

function operate(operator, firstNumber, secondNumber) {
    if (operator === '+') return add(firstNumber, secondNumber);
    if (operator === '-') return substract(firstNumber, secondNumber);
    if (operator === '*') return multiply(firstNumber, secondNumber);
    if (operator === '/') return divide(firstNumber, secondNumber);
}

function getNumber(char) {
    resetBackgroundColor();
    currentNumber += char;
    assignNumber(currentNumber);
    operationDisplay.textContent = cleanNumber(currentNumber);
}

function assignNumber(currentNumber) {
    if (!operator) firstNumber = currentNumber;
    else secondNumber = currentNumber;
}

function getOperator(char) {
    resetBackgroundColor();
    if (secondNumber) solution = operate(operator, Number(firstNumber), Number(secondNumber));
    else solution = firstNumber;

    if (char !== '=') operator = char;
    else operator = '';

    firstNumber = solution;
    currentNumber = secondNumber = '';
    operationDisplay.textContent = cleanNumber(solution);
}

function applyKeyButtons(char) {
    if (currentNumber === '') currentNumber = firstNumber;

    if (char === '%') currentNumber *= 0.01;
    else if (char === '+/-') currentNumber *= -1;
    else if (!num.toString().includes('.')) {
        if (currentNumber === '') currentNumber = '0.';
        else currentNumber += '.';
    }

    if (currentNumber === 0) currentNumber = '';

    assignNumber(currentNumber);
    operationDisplay.textContent = cleanNumber(currentNumber);
}

function clear() {
    currentNumber = firstNumber = secondNumber = operator = '';
    solution = 0;
    operationDisplay.textContent = '';
    resetBackgroundColor();
}

function cleanNumber(currentNumber) {
    if (currentNumber.toString().length > 9) return parseFloat(currentNumber).toExponential(1);
    else return currentNumber;
}

function lightenBackgroundColor(e) {
    operatorButtons.forEach((button) => {
        if (e === button.value) button.classList.toggle('lighter-operator');
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

document.addEventListener('keydown', (e) => {
        if (e.key >= 0 || e.key <= 9) getNumber(e.key);
        if (e.key === '.' || e.key === '%') applyKeyButtons(e.key);
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') applyKeyButtons('+/-');
        if (e.key === 'Escape') clear();
        if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '=') {
            getOperator(e.key);
            lightenBackgroundColor(e.key);
        }
        if (e.key === 'Enter') {
            getOperator('=');
            lightenBackgroundColor('=');
        }
});