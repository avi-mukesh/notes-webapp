import RegInput from "./RegInput"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { faLock } from "@fortawesome/free-solid-svg-icons"

const ResetPassword = ({ resetPassword }) => {
    const [newPassword, setNewPassword] = useState("")
    let { id, token } = useParams()

    return (
        <div className="form-container">
            <form onSubmit={(e) => e.preventDefault()}>
                <RegInput
                    icon={faLock}
                    type="password"
                    placeholder="Enter new password"
                    state={newPassword}
                    setState={setNewPassword}
                ></RegInput>

                <div className="input-group">
                    <button
                        onClick={() => resetPassword(id, token, newPassword)}
                    >
                        Change password
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword
