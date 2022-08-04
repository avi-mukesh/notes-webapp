import "./App.css"
import "./SignUp.css"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
} from "react-router-dom"
import Home from "./Home.js"
import SignUp from "./SignUp.js"
import NotFound from "./NotFound.js"

const AppInside = () =>
    useRoutes([
        { path: "/", element: <SignUp /> },
        { path: "/login", element: <SignUp /> },
        { path: "/home", element: <Home /> },
        { path: "*", element: <NotFound /> },
    ])

const App = () => (
    <div className="container">
        <Router>
            <AppInside />
        </Router>
    </div>
)

export default App
