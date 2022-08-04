import RegInput from "./RegInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

const SignInForm = () => (
    <>
        <span className="form-heading">Sign in</span>
        <form>
            <RegInput
                icon={faUser}
                type="text"
                placeholder="Username"
            ></RegInput>
            <RegInput
                icon={faLock}
                type="password"
                placeholder="Password"
            ></RegInput>
            <div className="input-group">
                <button>
                    <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                </button>
            </div>
            <div className="switch-login">
                <a href="/">
                    Don't have have an account?<span>Sign up</span>
                </a>
            </div>
        </form>
    </>
)

export default SignInForm
