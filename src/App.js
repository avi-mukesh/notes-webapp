import "./styles/App.css"
import "./style/SignUp.css"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/app/Home.js"
import SignUp from "./components/auth/SignUp.js"
import NotFound from "./components/NotFound.js"
import Alert from "./components/Alert.js"

import { SERVER_URL } from "./consts"

const App = () => {
    const [error, setError] = useState("")
    const [accessToken, setAccessToken] = useState("")

    // first thing when page is rendered, get a new accessToken if refreshToken exists
    useEffect(() => {
        async function checkRefreshToken() {
            const result = await fetch(`${SERVER_URL}/auth/refresh_token`, {
                method: "POST",
                credentials: "include", // needed to include the cookie
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const json = await result.json()
            if (result.status >= 400) {
                setError(json.message)
            } else {
                setAccessToken(json.accessToken)
            }
        }

        checkRefreshToken()
    }, [])

    return (
        <div className="container">
            <Alert error={error} setError={setError} />

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
