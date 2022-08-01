import { useState } from "react"
import Note from "./Note"

const Notes = ({
    notes,
    onSelectNote,
    onCreateNote,
    onDeleteNote,
    onTogglePin,
    showPinnedOnly,
    setShowPinnedOnly,
    showNotesBox,
}) => {
    const [noteSearch, setNoteSearch] = useState("")
    const responsiveStyle = {
        left: showNotesBox ? "0" : "-30vw",
    }
    return (
        <div className="notesBox" style={responsiveStyle}>
            <div className="notesBoxTop">
                <h1 className="title">Notes</h1>
                <button className="createNoteButton" onClick={onCreateNote}>
                    +
                </button>
            </div>
            <input
                type="text"
                className="searchNoteInput"
                placeholder="Search"
                value={noteSearch}
                onChange={(e) => setNoteSearch(e.target.value)}
            />
            {notes.length && (
                <div className="inputGroup">
                    <label className="inputLabel" htmlFor="showPinnedCheckbox">
                        Show pinned notes only
                    </label>
                    <input
                        type="checkbox"
                        id="showPinnedCheckbox"
                        value={showPinnedOnly}
                        onChange={() => setShowPinnedOnly(!showPinnedOnly)}
                    />
                </div>
            )}
            {notes.length > 0 ? (
                <>
                    {notes
                        .filter(
                            (note) =>
                                note.text
                                    ?.toLowerCase()
                                    ?.includes(noteSearch.toLowerCase()) ||
                                note.title
                                    ?.toLowerCase()
                                    ?.includes(noteSearch.toLowerCase())
                        )
                        .filter((note) => {
                            if (showPinnedOnly) {
                                return note.pinned
                            } else {
                                return true
                            }
                        })
                        .map((note) => (
                            <Note
                                note={note}
                                key={note.id}
                                onSelectNote={onSelectNote}
                                onDeleteNote={onDeleteNote}
                                onTogglePin={onTogglePin}
                            />
                        ))}
                </>
            ) : (
                <h3>Create a note to get started!</h3>
            )}
        </div>
    )
}

export default Notes
