/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
    mode: "jit", // 确保开启 JIT 模式
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};
