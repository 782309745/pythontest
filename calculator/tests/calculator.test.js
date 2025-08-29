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

    test('科学计算功能', () => {
        const calculator = new Calculator();
        calculator.scientificFunction('sin');
        calculator.appendNumber('90');
        calculator.calculate();
        expect(parseFloat(document.getElementById('display').value)).toBeCloseTo(1);
    });

    test('清除功能', () => {
        const calculator = new Calculator();
        calculator.appendNumber('123');
        calculator.clearDisplay();
        expect(document.getElementById('display').value).toBe('');
    });

    test('错误处理', () => {
        const calculator = new Calculator();
        calculator.appendNumber('1');
        calculator.appendOperator('/');
        calculator.appendNumber('0');
        calculator.calculate();
        expect(document.getElementById('display').value).toBe('Error');
    });
});
