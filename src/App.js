import "./App.css"
import "./SignUp.css"
import { useState } from "react"
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useRoutes,
} from "react-router-dom"
import Home from "./Home.js"
import SignUp from "./SignUp.js"
import NotFound from "./NotFound.js"

// const AppInside = ({ accessToken, setAccessToken }) => {
//     console.log(accessToken)
//     useRoutes([
//         { path: "/", element: <SignUp /> },
//         {
//             path: "/signin",
//             element: <SignUp />,
//         },
//         { path: "/home", element: <Home /> },
//         { path: "*", element: <NotFound /> },
//     ])
// }
const App = () => {
    const [accessToken, setAccessToken] = useState("")

    return (
        <div className="container">
            <Router>
                {/* <AppInside
                    accessToken={accessToken}
                    setAccessToken={setAccessToken}
                /> */}
                <Routes>
                    <Route
                        path="/"
                        element={<SignUp setAccessToken={setAccessToken} />}
                    />
                    <Route
                        path="/signin"
                        element={<SignUp setAccessToken={setAccessToken} />}
                    />
                    <Route
                        path="/home"
                        element={<Home accessToken={accessToken} />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
