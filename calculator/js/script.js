class Calculator {
    constructor() {
        this.display = document.getElementById('display');
    }

    appendNumber(num) {
        this.display.value += num;
    }

    appendOperator(op) {
        this.display.value += op;
    }

    clearDisplay() {
        this.display.value = '';
    }

    backspace() {
        this.display.value = this.display.value.slice(0, -1);
    }

    calculate() {
        try {
            let expression = this.display.value
                .replace(/sin\(/g, 'Math.sin(')
                .replace(/cos\(/g, 'Math.cos(')
                .replace(/tan\(/g, 'Math.tan(')
                .replace(/sqrt\(/g, 'Math.sqrt(')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/log\(/g, 'Math.log10(');

            const result = eval(expression);
            this.display.value = isFinite(result) ? result : 'Error';
        } catch (error) {
            this.display.value = 'Error';
        }
    }

    scientificFunction(func) {
        this.display.value += func + '(';
    }

    power(exponent) {
        this.display.value += '**' + exponent;
    }

    constant(type) {
        if (type === 'pi') {
            this.display.value += 'π';
        } else if (type === 'e') {
            this.display.value += 'e';
        }
    }
}

const calculator = new Calculator();