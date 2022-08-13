import { ALERT_TYPES } from "../consts.js"
import {
    AiOutlineExclamationCircle,
    AiOutlineCheckCircle,
} from "react-icons/ai"

const Alert = ({ alert, setAlert }) => {
    let backgroundColor = "rgb(227, 61, 61)"
    if (alert.type === ALERT_TYPES.SUCCESS) backgroundColor = "rgb(9, 181, 75)"

    return (
        <div
            className="alertBox"
            style={{
                display: alert.message ? "block" : "none",
                backgroundColor,
            }}
        >
            {alert.type === ALERT_TYPES.ERROR ? (
                <AiOutlineExclamationCircle />
            ) : (
                <AiOutlineCheckCircle />
            )}

            <button onClick={() => setAlert({ type: "", message: "" })}>
                x
            </button>
            <h3 className="alertHeading">Error</h3>
            <p>{alert.message}</p>
        </div>
    )
}
export default Alert
