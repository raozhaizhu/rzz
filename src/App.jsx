import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // 引入 React Router 相关组件
import "./App.css";
import Quote from "./components/Quote"; // 引入 Quote 组件

function App() {
    return (
        <Router>
            {/* 包裹整个应用 */}
            <div className="app flex justify-center items-center min-h-screen min-w-screen">
                {/* 路由配置 */}
                <Routes>
                    <Route path="/" element={<Quote />} /> {/* 路由 "/": 显示 Quote 组件 */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
