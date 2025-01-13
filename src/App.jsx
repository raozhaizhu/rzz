import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Quote from "./components/Quote";
import Markdown from "./components/Markdown";

function App() {
    return (
        <Router>
            <>
                <Routes>
                    <Route path="/" element={<Markdown />} />
                    <Route path="/Quote" element={<Quote />} />
                </Routes>
            </>
        </Router>
    );
}

export default App;
