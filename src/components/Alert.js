import { AiOutlineExclamationCircle } from "react-icons/ai"

const Alert = ({ error, setError }) => {
    return (
        <div className="alertBox" style={{ display: error ? "block" : "none" }}>
            <AiOutlineExclamationCircle />
            <button onClick={() => setError("")}>x</button>
            <h3 className="alertHeading">Error</h3>
            <p>{error}</p>
        </div>
    )
}
export default Alert
