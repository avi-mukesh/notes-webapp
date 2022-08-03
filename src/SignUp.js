import RegInput from "./RegInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faUser,
    faEnvelope,
    faLock,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"

const SignUp = () => {
    return (
        <div class="form-container">
            <span class="form-heading">Sign up</span>
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
                <div class="input-group">
                    <button>
                        <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                    </button>
                </div>
                <div class="switch-login">
                    <a href="">
                        Already have an account<span>Login</span>
                    </a>
                </div>
            </form>
        </div>
    )
}

export default SignUp
