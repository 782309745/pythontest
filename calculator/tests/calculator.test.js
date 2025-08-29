/**
 * @jest-environment jsdom
 */

// 定义 Calculator 类，与主文件保持一致
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
}

describe('Calculator', () => {
    // 在每个测试前初始化计算器
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="calculator">
                <input type="text" id="display" readonly>
                <div class="buttons"></div>
            </div>
        `;
    });

    test('基础加法运算', () => {
        const calculator = new Calculator();
        calculator.appendNumber('2');
        calculator.appendOperator('+');
        calculator.appendNumber('2');
        calculator.calculate();
        expect(document.getElementById('display').value).toBe('4');
    });

    test('科学计算 - sin', () => {
        const calculator = new Calculator();
        calculator.scientificFunction('sin');
        calculator.appendNumber('90');
        calculator.appendOperator(')');
        calculator.calculate();
        const result = parseFloat(document.getElementById('display').value);
        expect(result).toBeCloseTo(Math.sin(90));
    });

    test('清除功能', () => {
        const calculator = new Calculator();
        calculator.appendNumber('123');
        calculator.clearDisplay();
        expect(document.getElementById('display').value).toBe('');
    });

    test('错误处理 - 除以零', () => {
        const calculator = new Calculator();
        calculator.appendNumber('1');
        calculator.appendOperator('/');
        calculator.appendNumber('0');
        calculator.calculate();
        expect(document.getElementById('display').value).toBe('Error');
    });

    test('小数点运算', () => {
        const calculator = new Calculator();
        calculator.appendNumber('1.5');
        calculator.appendOperator('+');
        calculator.appendNumber('2.3');
        calculator.calculate();
        expect(document.getElementById('display').value).toBe('3.8');
    });

    test('复杂表达式计算', () => {
        const calculator = new Calculator();
        calculator.appendNumber('2');
        calculator.appendOperator('+');
        calculator.appendNumber('3');
        calculator.appendOperator('*');
        calculator.appendNumber('4');
        calculator.calculate();
        expect(document.getElementById('display').value).toBe('14');
    });
});
