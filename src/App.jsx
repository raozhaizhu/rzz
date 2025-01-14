import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "./App.css";
import Home from "./components/Home";
import Quote from "./components/Quote";
import Markdown from "./components/Markdown";

function App() {
    // 动态设置 basename
    const basename = process.env.NODE_ENV === "production" ? "/rzz" : "";

    // 解析查询参数 p 并导航到对应的路由
    useEffect(() => {
        function handleRedirect() {
            const params = new URLSearchParams(window.location.search);
            const path = params.get("p");

            if (path) {
                // 使用 basename 来处理路径
                window.history.replaceState(null, "", `${basename}${path}`);
            }
        }

        // 调用重定向函数
        handleRedirect();
    }, []); // 空依赖数组，确保只执行一次

    return (
        <HelmetProvider>
            <Router basename={basename}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Quote" element={<Quote />} />
                    <Route path="/Markdown" element={<Markdown />} />
                </Routes>
            </Router>
        </HelmetProvider>
    );
}

export default App;
