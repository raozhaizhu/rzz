import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Quote from "./components/Quote";

function App() {
    return (
        <Router basename="/rzz">
            <div className="app flex justify-center items-center min-h-screen min-w-screen">
                <Routes>
                    <Route path="/" element={<Quote />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
