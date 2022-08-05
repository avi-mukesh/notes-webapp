import { useState } from "react"
import RegInput from "./RegInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faUser,
    faEnvelope,
    faLock,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"

const SignUpForm = () => {
    const [username, setUsername] = useState("avi")
    const [email, setEmail] = useState("avimukesh10@gmail.com")
    const [password, setPassword] = useState("my-password")
    const [confirmPassword, setConfirmPassword] = useState("my-password")

    const signupSubmit = async (e) => {
        e.preventDefault()
        console.log("trying to sign up")
        let res = await fetch("http://localhost:5000/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        })

        let json = await res.json()

        console.log(json.message)
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
