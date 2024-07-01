import { NavBar } from "./components/NavBar";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Pages/Home/Home";
import { Wordle } from "./components/Pages/Wordle/Wordle";
import { Hangman } from "./components/Pages/HangMan/HangMan";
function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/wordle" element={<Wordle/>} />
                    <Route path="/hangman" element={<Hangman/>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
