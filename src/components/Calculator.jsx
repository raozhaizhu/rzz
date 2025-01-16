import { React, useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    // define state variables
    const [input, setInput] = useState('0');
    const [result, setResult] = useState('0');
    // define functions
    // 处理清空按钮
    const handleClear = () => {
        setInput('0');
        setResult('0');
    };
    // 处理数值和符号输入
    const handleInput = (value) => {
        setInput((prevInput) => {
            // 分4种情况来处理 value 的类型

            //1.如果输入的是0
            if (value === '0' && prevInput === '0') {
                // 如果输入的是0，且当前输入框中已经有0，则不做任何操作
                return prevInput;
            }

            // 2.如果输入的是1-9的数字
            if (/[1-9]/.test(value)) {
                if (prevInput === '0') {
                    // 如果开头是0，去掉0并输入新的数字
                    return value;
                }
                return prevInput + value; // 否则，直接追加数字
            }
            // 3.如果输入的是运算符 (+, -, *, /)
            if (/[+\-*/]/.test(value)) {
                if (prevInput === '0') {
                    // 如果当前输入是0，允许输入运算符
                    return prevInput + value;
                }
                return prevInput + value; // 否则，直接追加运算符
            }

            // 4.如果输入的是小数点
            if (value === '.') {
                // 检查当前输入是否包含小数点以及是否存在不合法的小数点组合（如 9.9.9 或 0.9.）
                const regex = /\.\d*\.\d*|\.\d*\./;
                if (regex.test(prevInput + value)) {
                    // 如果有非法小数点组合，则保持之前的输入
                    return prevInput;
                }
                return prevInput + value; // 否则，允许输入小数点
            }

            return prevInput + value; // 默认处理：其他情况直接追加字符
        });
    };

    // 处理计算按钮
    const handleCalculate = () => {
        // 匹配连续的运算符
        const regex = /[+\-*/]{2,}/g;

        const sanitizedInput = input.replace(regex, (match) => {
            // 检查负号是否位于末尾
            if (match[match.length - 1] === '-') {
                // 如果正号或者负号在末尾，则取最后2个运算符
                return match[match.length - 2] + match[match.length - 1];
            }

            // 对于其他合法的连续符号，保留最后一个符号
            return match[match.length - 1];
        });

        try {
            // 使用 eval 计算结果
            const newResult = eval(sanitizedInput);
            setInput(newResult.toString());
            setResult(newResult.toString());
        } catch (error) {
            // 如果计算失败，显示错误信息
            setInput('Error');
            setResult('Error');
        }
    };

    // 定义按钮
    const btn = [
        { value: '1', id: 'one', function: handleInput },
        { value: '2', id: 'two', function: handleInput },
        { value: '3', id: 'three', function: handleInput },
        { value: '4', id: 'four', function: handleInput },
        { value: '5', id: 'five', function: handleInput },
        { value: '6', id: 'six', function: handleInput },
        { value: '7', id: 'seven', function: handleInput },
        { value: '8', id: 'eight', function: handleInput },
        { value: '9', id: 'nine', function: handleInput },
        { value: '0', id: 'zero', function: handleInput },
        { value: '.', id: 'decimal', function: handleInput },
        { value: '+', id: 'add', function: handleInput },
        { value: '-', id: 'subtract', function: handleInput },
        { value: '*', id: 'multiply', function: handleInput },
        { value: '/', id: 'divide', function: handleInput },
        { value: '=', id: 'equals', function: handleCalculate },
        { value: 'C', id: 'clear', function: handleClear },
    ];
    // 渲染开始
    return (
        <div className='bg-[#000] text-[fff] p-[1rem]'>
            <div id='display' className='text-white text-center text-[2rem]'>
                {input}
            </div>
            <div id='display' className='text-white text-center text-[2rem]'>
                {result}
            </div>
            {btn.map((button) => (
                <button
                    className='btn btn-primary btn-lg'
                    key={button.id}
                    id={button.id}
                    onClick={() => button.function(button.value)} // 传递按钮的 value 给对应的函数
                >
                    {button.value}
                </button>
            ))}
        </div>
    );
};

export default Calculator;

