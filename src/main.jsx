import React from "react";
import { createRoot } from "react-dom/client";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./index.css";
import App from "./App.jsx";

// 解析查询参数 p 并导航到对应的路由
function handleRedirect() {
    const params = new URLSearchParams(window.location.search);
    const path = params.get("p");

    if (path) {
        // 确保修改后的路径包含 /rzz
        window.history.replaceState(null, "", `/rzz${path}`);
    }
}

// 在 React 渲染之前调用重定向逻辑
handleRedirect();

// 获取根元素并渲染 React 应用
const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// 添加渲染完成事件，供外部系统或工具监听
document.dispatchEvent(new Event("render-event"));
