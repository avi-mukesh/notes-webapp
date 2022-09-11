import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faThumbTack } from "@fortawesome/free-solid-svg-icons"

const Note = ({ note, onSelectNote, onDeleteNote, onTogglePin }) => (
    <div
        className="noteBox"
        style={{
            borderBottom: `1px solid ${note.pinned ? "yellow" : "white"}`,
        }}
    >
        <div className="noteBoxContent" onClick={(e) => onSelectNote(note.id)}>
            <h4 className="noteBoxTitle">{note.title}</h4>
            <p className="noteBoxText">{note.text}</p>
        </div>
        <div className="noteButtons">
            <button
                className="deleteNoteButton"
                onClick={() => onDeleteNote(note.id)}
            >
                <FontAwesomeIcon icon={faTrash} color="white" />
            </button>
            <button
                className="togglePinButton"
                onClick={() => {
                    onTogglePin(note)
                }}
            >
                <FontAwesomeIcon icon={faThumbTack} color="white" />
            </button>
        </div>
    </div>
)

export default Note
