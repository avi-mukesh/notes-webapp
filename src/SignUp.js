import { useLocation } from "react-router-dom"
import SignInForm from "./SignInForm.js"
import SignUpForm from "./SignUpForm.js"

const SignUp = ({ setAccessToken }) => {
    const location = useLocation()

    return (
        <div className="form-container">
            {location.pathname === "/signin" ? (
                <SignInForm setAccessToken={setAccessToken} />
            ) : (
                <SignUpForm />
            )}
        </div>
    )
}

export default SignUp
