import "./App.css"
import "./SignUp.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home.js"
import SignUp from "./SignUp.js"

const App = () => {
    return (
        <div className="container">
            <Router>
                <Routes>
                    <Route exact path="/" element={<SignUp />} />
                    <Route exact path="/home" element={<Home />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
