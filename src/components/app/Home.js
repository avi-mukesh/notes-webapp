import Notes from "./Notes"
import NoteView from "./NoteView"
import { useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import Alert from "../Alert.js"

import { SERVER_URL } from "../../consts.js"

const Home = ({ accessToken, setAccessToken }) => {
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const tablet = useMediaQuery({ maxWidth: "900px" })

    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState({})
    const [showNotesBox, setShowNotesBox] = useState(false)

    useEffect(() => {
        async function fetchData() {
            let response = await fetch(`${SERVER_URL}/notes`, {
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            })
            let json = await response.json()
            if (response.status >= 400) {
                setError(json.message)
            } else {
                setNotes(json)
            }
        }
        if (accessToken) {
            fetchData()
        } else {
            navigate("/signin")
        }
        // fetch notes when accessToken changes, or when the selected note changes
    }, [accessToken, navigate, selectedNote])

    const onCreateNote = async () => {
        if (selectedNote.id) {
            const response = await fetch(
                `${SERVER_URL}/update_note/${selectedNote.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        title: selectedNote.title,
                        text: selectedNote.text,
                        pinned: selectedNote.pinned,
                    }),
                }
            )
            const json = await response.json()
            if (response.status >= 400) {
                setError(json.message)
            }
        }
        createNote({ title: "", text: "" })
    }

    const onDeleteNote = async (id) => {
        fetch(`${SERVER_URL}/delete_note`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ id }),
        })
            .then(() => {
                setNotes(notes.filter((note) => note.id !== id))
                setSelectedNote({})
            })
            .catch((err) => setError(err.message))
    }

    const createNote = async (note) => {
        console.log("Creating note")
        const response = await fetch(`${SERVER_URL}/create_note`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                title: note.title,
                text: note.text,
            }),
        })
        const json = await response.json()

        if (response.status >= 400) {
            setError(json.message)
        } else {
            const newNote = json.note
            setSelectedNote(newNote)
        }
    }

    const updateNote = async (note) => {
        if (!note.id) {
            createNote(note)
        } else {
            console.log(selectedNote)
            setSelectedNote({
                ...selectedNote,
                title: note.title,
                text: note.text,
                pinned: note.pinned,
            })
        }
    }

    const onTogglePin = async (note) => {
        console.log("toggling", note)
        const response = await fetch(`${SERVER_URL}/update_note/${note.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ pinned: !note.pinned }),
        })
        const json = await response.json()

        if (response.status >= 400) {
            setError(json.message)
        } else {
            setSelectedNote(json.note)
        }
    }
    const getNoteById = async (id) => {
        console.log("getting note", id)
        const response = await fetch(`${SERVER_URL}/note/${id}`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        })
        const json = await response.json()

        if (response.status >= 400) {
            setError(json.message)
        } else {
            return json.note
        }
    }
    const onSelectNote = async (id) => {
        if (selectedNote.id) {
            const response = await fetch(
                `${SERVER_URL}/update_note/${selectedNote.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        title: selectedNote.title,
                        text: selectedNote.text,
                        pinned: selectedNote.pinned,
                    }),
                }
            )
            const json = await response.json()
            if (response.status >= 400) {
                setError(json.message)
            }
        }

        if (tablet) setShowNotesBox(false)
        const note = await getNoteById(id)
        setSelectedNote(note)
    }

    const onSignOut = async () => {
        const response = await fetch(`${SERVER_URL}/auth/signout`, {
            method: "DELETE",
            credentials: "include",
        })
        if (response.status >= 400) {
            const json = await response.json()
            setError(json.message)
        } else {
            setAccessToken("")
            navigate("/signin")
        }
    }

    return (
        <div>
            <button
                className="toggleNotesBoxButton"
                onClick={() => {
                    if (tablet) {
                        setShowNotesBox(!showNotesBox)
                    }
                }}
            >
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>
            <Alert error={error} setError={setError} />

            <NoteView note={selectedNote} updateNote={updateNote} />
            <Notes
                notes={notes}
                onSelectNote={onSelectNote}
                onCreateNote={onCreateNote}
                onDeleteNote={onDeleteNote}
                onTogglePin={onTogglePin}
                showNotesBox={showNotesBox}
                tablet={tablet}
                onSignOut={onSignOut}
            />
        </div>
    )
}

export default Home
