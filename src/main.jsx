// src/main.jsx

import React from "react";
import { createRoot } from "react-dom/client";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./index.css";
import App from "./App.jsx";

// 获取根元素并渲染 React 应用
const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// 添加渲染完成事件，供外部系统或工具监听
document.dispatchEvent(new Event("render-event"));
