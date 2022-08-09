import { useState } from "react"
import Note from "./Note"

const Notes = ({
    notes,
    onSelectNote,
    onCreateNote,
    onDeleteNote,
    onTogglePin,
    showNotesBox,
    tablet,
    onSignOut,
}) => {
    const [noteSearch, setNoteSearch] = useState("")

    return (
        <div
            className="notesBox"
            style={{ left: tablet && !showNotesBox ? "-100%" : "0" }}
        >
            <div className="notesBoxTop">
                <h1 className="title">Notes</h1>
                <button className="createNoteButton" onClick={onCreateNote}>
                    +
                </button>
                <input
                    type="text"
                    className="searchNoteInput"
                    placeholder="Search"
                    value={noteSearch}
                    onChange={(e) => setNoteSearch(e.target.value)}
                />
                <button className="signOutButton" onClick={onSignOut}>
                    Sign out
                </button>
            </div>

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
                        .sort((noteA, noteB) => noteB.pinned - noteA.pinned)
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
