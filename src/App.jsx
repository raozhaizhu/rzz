import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Quote from "./components/Quote";
import Markdown from "./components/Markdown";

function App() {
    // 动态设置 basename
    const basename = process.env.NODE_ENV === "production" ? "/rzz" : "";
    return (
        <Router basename={basename}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="Markdown" element={<Markdown />} />
                <Route path="Quote" element={<Quote />} />
            </Routes>
        </Router>
    );
}

export default App;
