import RegInput from "./RegInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignInForm = ({ setAccessToken }) => {
    const [username, setUsername] = useState("avi")
    const [password, setPassword] = useState("my-password")

    const navigate = useNavigate()

    const signinSubmit = async (e) => {
        e.preventDefault()
        let res = await fetch("http://localhost:5000/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        let json = await res.json()
        console.log(json.accessToken)
        setAccessToken(json.accessToken)
        navigate("/home")
    }

    return (
        <>
            <p style={{ color: "white" }}>
                {username} + {password}
            </p>
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
