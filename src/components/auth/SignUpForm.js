import { useState } from "react"
import RegInput from "./RegInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faUser,
    faEnvelope,
    faLock,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"

import { ALERT_TYPES } from "../../consts.js"
import { SERVER_URL } from "../../consts.js"

const SignUpForm = ({ setAlert }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const signupSubmit = async (e) => {
        e.preventDefault()
        if (confirmPassword !== password) {
            setPassword("")
            setConfirmPassword("")
            return setAlert({
                type: ALERT_TYPES.ERROR,
                message: "Passwords need to match",
            })
        }

        try {
            e.preventDefault()
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
                setAlert({ type: ALERT_TYPES.ERROR, message: json.message })
            } else {
                setAlert({
                    type: ALERT_TYPES.SUCCESS,
                    message: "Success! You can now sign in",
                })
                setUsername("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
            }
        } catch (err) {
            setAlert({
                type: ALERT_TYPES.ERROR,
                message: "Error: couldn't sign up",
            })
        }
    }

    return (
        <>
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
