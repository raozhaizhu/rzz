import { React, useState } from "react";
import "./Calculator.css";

const Calculator = () => {
    const [numberSequence, setNumberSequence] = useState([]); // 数字数列
    const [operatorSequence, setOperatorSequence] = useState([]); // 运算符数列
    const [expression, setExpression] = useState("0"); // 表达式
    const [output, setOutput] = useState("0"); // 计算结果

    // 按钮列表
    const buttons = [
        { name: "7", id: "seven" },
        { name: "8", id: "eight" },
        { name: "9", id: "nine" },
        { name: "/", id: "divide" },
        { name: "4", id: "four" },
        { name: "5", id: "five" },
        { name: "6", id: "six" },
        { name: "*", id: "multiply" },
        { name: "1", id: "one" },
        { name: "2", id: "two" },
        { name: "3", id: "three" },
        { name: "-", id: "subtract" },
        { name: "0", id: "zero" },
        { name: ".", id: "decimal" },
        { name: "=", id: "equals" },
        { name: "+", id: "add" },
        { name: "C", id: "clear" },
        { name: "←", id: "backspace" },
    ];

    // 更新表达式
    const updateExpression = (numbers, operators) => {
        let expr = "";
        for (let i = 0; i < numbers.length; i++) {
            expr += numbers[i];
            if (i < operators.length) expr += operators[i];
        }
        return expr;
    };

    const handleButtonClick = (btn) => {
        const value = btn.name;

        switch (value) {
            case "C":
                // 清空所有状态
                setNumberSequence([]);
                setOperatorSequence([]);
                setExpression("0");
                setOutput("0");
                break;

            case "←":
                // 删除最后一项（数字或运算符）
                if (operatorSequence.length >= numberSequence.length) {
                    // 删除最后一个运算符
                    setOperatorSequence((prev) => prev.slice(0, -1));
                } else {
                    // 删除最后一个数字
                    setNumberSequence((prev) => prev.slice(0, -1));
                }
                break;

            case "=":
                // 计算表达式
                try {
                    const validExpression = updateExpression(
                        numberSequence,
                        operatorSequence
                    );
                    const result = new Function(`return ${validExpression}`)();
                    setOutput(result.toString());
                } catch (e) {
                    setOutput("Error");
                }
                break;

            default:
                if (["+", "-", "*", "/"].includes(value)) {
                    // 运算符输入
                    setOperatorSequence((prev) => {
                        if (prev.length >= numberSequence.length) {
                            // 替换最后一个运算符
                            return [...prev.slice(0, -1), value];
                        }
                        return [...prev, value];
                    });
                } else {
                    // 数字输入
                    setNumberSequence((prev) => {
                        if (operatorSequence.length === prev.length) {
                            // 开始新的数字
                            return [...prev, value];
                        }
                        // 继续拼接当前数字
                        const newNumbers = [...prev];
                        newNumbers[newNumbers.length - 1] += value;
                        return newNumbers;
                    });
                }
                break;
        }

        // 每次更新后，重新生成表达式
        setExpression(updateExpression(numberSequence, operatorSequence));
    };

    return (
        <div className="calculator p-4 bg-gray-800 text-white">
            {/* 显示屏 */}
            <div id="display" className="display bg-gray-900 p-4 mb-4 rounded">
                <div className="expression text-right text-xl">
                    {expression || "0"} {/* 显示当前表达式 */}
                </div>
                <div className="output text-right text-2xl font-bold">
                    {output} {/* 显示计算结果 */}
                </div>
            </div>

            {/* 按钮区 */}
            <div className="button-pad grid grid-cols-4 gap-2">
                {buttons.map((btn) => (
                    <button
                        id={btn.id}
                        key={btn.id}
                        className="btn bg-gray-700 hover:bg-gray-600 p-4 rounded"
                        onClick={() => handleButtonClick(btn)}>
                        {btn.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
