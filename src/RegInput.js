import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const RegInput = ({ icon, type, placeholder, state, setState }) => (
    <div className="input-group">
        <i>
            <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
        </i>
        <input
            type={type}
            placeholder={placeholder}
            value={state}
            onChange={(e) => setState(e.target.value)}
        />
        <span className="bar"></span>
    </div>
)

export default RegInput
