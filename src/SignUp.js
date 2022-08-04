import { useLocation } from "react-router-dom"
import SignInForm from "./SignInForm.js"
import SignUpForm from "./SignUpForm.js"

const SignUp = () => {
    const location = useLocation()
    console.log(location.pathname)

    return (
        <div className="form-container">
            {location.pathname === "/login" ? <SignInForm /> : <SignUpForm />}
        </div>
    )
}

export default SignUp
