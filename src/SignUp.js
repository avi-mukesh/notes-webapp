import { useLocation } from "react-router-dom"
import SignInForm from "./SignInForm.js"
import SignUpForm from "./SignUpForm.js"

const SignUp = () => {
    const location = useLocation()

    return (
        <div className="form-container">
            {location.pathname === "/signin" ? <SignInForm /> : <SignUpForm />}
        </div>
    )
}

export default SignUp
