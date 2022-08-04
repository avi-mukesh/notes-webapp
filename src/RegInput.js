import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const RegInput = ({ icon, type, placeholder }) => (
    <div className="input-group">
        <i>
            <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
        </i>
        <input type={type} placeholder={placeholder} />
        <span className="bar"></span>
    </div>
)

export default RegInput
