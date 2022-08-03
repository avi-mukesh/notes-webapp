import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const RegInput = ({ icon, type, placeholder }) => (
    <div class="input-group">
        <i>
            <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
        </i>
        <input type={type} placeholder={placeholder} />
        <span class="bar"></span>
    </div>
)

export default RegInput
