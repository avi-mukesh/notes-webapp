import { useState } from "react"
import RegInput from "./RegInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faUser,
    faEnvelope,
    faLock,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"
import Alert from "../Alert"

import { SERVER_URL } from "../../consts.js"

const SignUpForm = () => {
    const [error, setError] = useState("")

    const [username, setUsername] = useState("avi")
    const [email, setEmail] = useState("avimukesh10@gmail.com")
    const [password, setPassword] = useState("my-password")
    const [confirmPassword, setConfirmPassword] = useState("my-password")

    const signupSubmit = async (e) => {
        try {
            e.preventDefault()
            console.log("trying to sign up")
            let result = await fetch(`${SERVER_URL}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            })
            let json = await result.json()
            if (result.status >= 400) {
                setError(json.message)
            }
        } catch (err) {
            setError("Error: couldn't sign up")
        }
    }

    return (
        <>
            <Alert error={error} setError={setError} />
            <span className="form-heading">Sign up</span>
            <form onSubmit={signupSubmit}>
                <RegInput
                    icon={faUser}
                    type="text"
                    placeholder="Username"
                    state={username}
                    setState={setUsername}
                ></RegInput>
                <RegInput
                    icon={faEnvelope}
                    type="email"
                    placeholder="Email"
                    state={email}
                    setState={setEmail}
                ></RegInput>
                <RegInput
                    icon={faLock}
                    type="password"
                    placeholder="Password"
                    state={password}
                    setState={setPassword}
                ></RegInput>
                <RegInput
                    icon={faLock}
                    type="password"
                    placeholder="Confirm password"
                    state={confirmPassword}
                    setState={setConfirmPassword}
                ></RegInput>
                <div className="input-group">
                    <button>
                        <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                    </button>
                </div>
                <div className="switch-signin">
                    <a href="/signin">
                        Already have an account?<span>Sign in</span>
                    </a>
                </div>
            </form>
        </>
    )
}

export default SignUpForm
