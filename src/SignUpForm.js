import RegInput from "./RegInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faUser,
    faEnvelope,
    faLock,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"

const SignUpForm = () => (
    <>
        <span className="form-heading">Sign up</span>
        <form>
            <RegInput
                icon={faUser}
                type="text"
                placeholder="Username"
            ></RegInput>
            <RegInput
                icon={faEnvelope}
                type="email"
                placeholder="Email"
            ></RegInput>
            <RegInput
                icon={faLock}
                type="password"
                placeholder="Password"
            ></RegInput>
            <RegInput
                icon={faLock}
                type="password"
                placeholder="Confirm password"
            ></RegInput>
            <div className="input-group">
                <button>
                    <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                </button>
            </div>
            <div className="switch-login">
                <a href="/login">
                    Already have an account?<span>Sign in</span>
                </a>
            </div>
        </form>
    </>
)

export default SignUpForm
