import "./App.css"
import "./SignUp.css"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./Home.js"
import SignUp from "./SignUp.js"
import NotFound from "./NotFound.js"

const App = () => {
    const [accessToken, setAccessToken] = useState("")

    // firs thing when page is rendered, get a new accessToken if refreshToken exists
    useEffect(() => {
        async function checkRefreshToken() {
            const result = await fetch(
                "http://localhost:5000/auth/refresh_token",
                {
                    method: "POST",
                    credentials: "include", // needed to include the cookie
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            const json = await result.json()
            console.log("check refresh token", json)
            setAccessToken(json.accessToken)
        }

        checkRefreshToken()
    }, [])



    return (
        <div className="container">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <SignUp
                                accessToken={accessToken}
                                setAccessToken={setAccessToken}
                            />
                        }
                    />
                    <Route
                        path="/signin"
                        element={
                            <SignUp
                                accessToken={accessToken}
                                setAccessToken={setAccessToken}
                            />
                        }
                    />
                    <Route
                        path="/home"
                        element={
                            <Home
                                accessToken={accessToken}
                                setAccessToken={setAccessToken}
                            />
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
