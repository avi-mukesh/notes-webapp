import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import SignInForm from "./SignInForm.js"
import SignUpForm from "./SignUpForm.js"

const SignUp = ({ accessToken, setAccessToken, setAlert }) => {
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        console.log(accessToken)
        if (accessToken) {
            console.log("logged in already")
            navigate("/home")
        }
    }, [accessToken, navigate])

    return (
        <div className="form-container">
            {location.pathname === "/signin" ? (
                <SignInForm
                    setAccessToken={setAccessToken}
                    setAlert={setAlert}
                />
            ) : (
                <SignUpForm setAlert={setAlert} />
            )}
        </div>
    )
}

export default SignUp
