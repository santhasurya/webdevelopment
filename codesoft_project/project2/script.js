// script.js

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            const number = button.dataset.number;

            if (number !== undefined) {
                if (currentInput === '0') {
                    currentInput = number;
                } else {
                    currentInput += number;
                }
            } else if (action !== undefined) {
                switch (action) {
                    case 'clear':
                        currentInput = '';
                        previousInput = '';
                        operator = '';
                        break;
                    case 'delete':
                        currentInput = currentInput.slice(0, -1);
                        break;
                    case 'percent':
                        currentInput = (parseFloat(currentInput) / 100).toString();
                        break;
                    case 'divide':
                        setOperator('/');
                        break;
                    case 'multiply':
                        setOperator('*');
                        break;
                    case 'subtract':
                        setOperator('-');
                        break;
                    case 'add':
                        setOperator('+');
                        break;
                    case 'decimal':
                        if (!currentInput.includes('.')) {
                            currentInput += '.';
                        }
                        break;
                    case 'equals':
                        if (previousInput !== '' && operator !== '') {
                            currentInput = calculate(previousInput, currentInput, operator).toString();
                            previousInput = '';
                            operator = '';
                        }
                        break;
                }
            }

            updateDisplay(currentInput);
        });
    });

    function setOperator(op) {
        if (currentInput !== '') {
            if (previousInput !== '') {
                currentInput = calculate(previousInput, currentInput, operator).toString();
            }
            operator = op;
            previousInput = currentInput;
            currentInput = '';
        }
    }

    function calculate(first, second, op) {
        const num1 = parseFloat(first);
        const num2 = parseFloat(second);

        switch (op) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return num2;
        }
    }

    function updateDisplay(value) {
        display.textContent = value || '0';
    }
});
