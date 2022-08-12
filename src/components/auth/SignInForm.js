import RegInput from "./RegInput"
import Alert from "../Alert"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { SERVER_URL } from "../../consts.js"

const SignInForm = ({ setAccessToken }) => {
    const [error, setError] = useState("")

    const [username, setUsername] = useState("avi")
    const [password, setPassword] = useState("my-password")

    const navigate = useNavigate()

    const signinSubmit = async (e) => {
        e.preventDefault()
        try {
            let result = await fetch(`${SERVER_URL}/auth/signin`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
            let json = await result.json()

            if (result.status >= 400) {
                setError(json.message)
            } else if (json.accessToken) {
                setAccessToken(json.accessToken)
                navigate("/home")
            }
        } catch (err) {
            setError("Error: couldn't sign in")
        }
    }

    return (
        <>
            <Alert error={error} setError={setError} />

            <span className="form-heading">Sign in</span>
            <form onSubmit={signinSubmit}>
                <RegInput
                    icon={faUser}
                    type="text"
                    placeholder="Username"
                    state={username}
                    setState={setUsername}
                ></RegInput>
                <RegInput
                    icon={faLock}
                    type="password"
                    placeholder="Password"
                    state={password}
                    setState={setPassword}
                ></RegInput>
                <div className="input-group">
                    <button>
                        <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                    </button>
                </div>
                <div className="switch-signin">
                    <a href="/">
                        Don't have have an account?<span>Sign up</span>
                    </a>
                </div>
            </form>
        </>
    )
}

export default SignInForm
