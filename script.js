const result = document.getElementById('result');
let currentNumber = '';
let previousNumber = '';
let operation = null;
let shouldResetScreen = false;

document.querySelector('.buttons').addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    
    const value = e.target.textContent;
    
    if (!isNaN(value) || value === '.') {
        if (shouldResetScreen) {
            currentNumber = '';
            shouldResetScreen = false;
        }
        currentNumber += value;
        result.value = currentNumber;
    } else if (value === 'C') {
        currentNumber = '';
        previousNumber = '';
        operation = null;
        result.value = '0';
    } else if (value === '±') {
        currentNumber = (parseFloat(currentNumber) * -1).toString();
        result.value = currentNumber;
    } else if (value === '%') {
        currentNumber = (parseFloat(currentNumber) / 100).toString();
        result.value = currentNumber;
    } else if (['+', '-', '×', '÷'].includes(value)) {
        previousNumber = currentNumber;
        operation = value;
        shouldResetScreen = true;
    } else if (value === '=') {
        if (operation && previousNumber && currentNumber) {
            switch (operation) {
                case '+':
                    currentNumber = (parseFloat(previousNumber) + parseFloat(currentNumber)).toString();
                    break;
                case '-':
                    currentNumber = (parseFloat(previousNumber) - parseFloat(currentNumber)).toString();
                    break;
                case '×':
                    currentNumber = (parseFloat(previousNumber) * parseFloat(currentNumber)).toString();
                    break;
                case '÷':
                    currentNumber = (parseFloat(previousNumber) / parseFloat(currentNumber)).toString();
                    break;
            }
            result.value = currentNumber;
            operation = null;
            shouldResetScreen = true;
        }
    }
});
