import "./styles/App.css"
import "./styles/SignUp.css"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/app/Home.js"
import SignUp from "./components/auth/SignUp.js"
import NotFound from "./components/NotFound.js"
import Alert from "./components/Alert.js"
import ForgotPassword from "./components/auth/ForgotPassword.js"
import ResetPassword from "./components/auth/ResetPassword.js"
import { Navigate } from "react-router-dom"

import { ALERT_TYPES } from "./consts.js"
import { SERVER_URL } from "./consts"

const App = () => {
    const [alert, setAlert] = useState("")
    const [accessToken, setAccessToken] = useState("")
    const [shouldRedirect, setShouldRedirect] = useState(false)

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
                setAlert({ type: ALERT_TYPES.ERROR, message: json.message })
            } else {
                setAccessToken(json.accessToken)
            }
        }

        checkRefreshToken()
    }, [])

    const sendPasswordResetLink = async (email) => {
        const response = await fetch(`${SERVER_URL}/auth/forgot_password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
        const json = await response.json()
        if (response.status >= 400) {
            setAlert({ type: ALERT_TYPES.ERROR, message: json.message })
        } else {
            setAlert({ type: ALERT_TYPES.SUCCESS, message: "Check your email" })
        }
    }

    const resetPassword = async (id, token, newPassword) => {
        const response = await fetch(`${SERVER_URL}/auth/reset_password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, token, newPassword }),
        })
        const json = await response.json()
        if (response.status >= 400) {
            setAlert(json.message)
        } else {
            setShouldRedirect(true)
            setAlert({
                type: ALERT_TYPES.SUCCESS,
                message: "Password changed successfully",
            })
        }
    }

    return (
        <div className="container">
            <Alert alert={alert} setAlert={setAlert} />

            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <SignUp
                                accessToken={accessToken}
                                setAccessToken={setAccessToken}
                                setAlert={setAlert}
                            />
                        }
                    />
                    <Route
                        path="/signin"
                        element={
                            <SignUp
                                accessToken={accessToken}
                                setAccessToken={setAccessToken}
                                setAlert={setAlert}
                            />
                        }
                    />
                    <Route
                        path="/home"
                        element={
                            <Home
                                accessToken={accessToken}
                                setAccessToken={setAccessToken}
                                setAlert={setAlert}
                            />
                        }
                    />
                    <Route
                        path="/forgot_password"
                        element={
                            <ForgotPassword
                                sendPasswordResetLink={sendPasswordResetLink}
                                setAlert={setAlert}
                            />
                        }
                    />

                    <Route
                        path="/reset_password/:id/:token"
                        element={
                            shouldRedirect ? (
                                <Navigate to="/signin" /> // redirect to signin page if you just reset the password
                            ) : (
                                <ResetPassword resetPassword={resetPassword} />
                            )
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
