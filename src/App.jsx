import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "./App.css";
import Home from "./components/Home";
import Quote from "./components/Quote";
import Markdown from "./components/Markdown";

function App() {
    return (
        <HelmetProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Markdown" element={<Markdown />} />
                    <Route path="/Quote" element={<Quote />} />
                </Routes>
            </Router>
        </HelmetProvider>
    );
}

export default App;
