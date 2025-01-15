import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "./App.css";
import Home from "./components/Home";
import Quote from "./components/Quote";
import Markdown from "./components/Markdown";
import Drum from "./components/Drum";

function App() {
    // 动态设置 basename
    const basename = process.env.NODE_ENV === "production" ? "/rzz" : "";

    return (
        <HelmetProvider>
            <Router basename={basename}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Quote" element={<Quote />} />
                    <Route path="/Markdown" element={<Markdown />} />
                    <Route path="/Drum" element={<Drum />} />
                </Routes>
            </Router>
        </HelmetProvider>
    );
}

export default App;
