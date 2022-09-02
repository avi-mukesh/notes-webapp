import RegInput from "./RegInput.js"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const ForgotPassword = ({ sendPasswordResetLink, setAlert }) => {
    const [email, setEmail] = useState("avimukesh10@gmail.com")

    return (
        <div className="form-container">
            <form onSubmit={(e) => e.preventDefault()}>
                <RegInput
                    icon={faEnvelope}
                    type="email"
                    placeholder="Enter your email address"
                    state={email}
                    setState={setEmail}
                ></RegInput>
                <div className="input-group">
                    <button onClick={() => sendPasswordResetLink(email)}>
                        Send password reset link
                    </button>
                </div>

                <div className="forgot-password">
                    <a href="/signin">
                        Remember your password?<span>Sign in</span>
                    </a>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword
