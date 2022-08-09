import Notes from "./Notes"
import NoteView from "./NoteView"
import { useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const Home = ({ accessToken, setAccessToken }) => {
    const navigate = useNavigate()

    const tablet = useMediaQuery({ maxWidth: "900px" })

    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState({})
    const [showNotesBox, setShowNotesBox] = useState(false)

    useEffect(() => {
        async function fetchData() {
            let response = await fetch("http://localhost:5000/notes", {
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            })
            let data = await response.json()
            if (data.message) {
                console.log(data.message)
            } else {
                setNotes(data)
            }
        }
        if (accessToken) {
            fetchData()
        } else {
            navigate("/signin")
        }
    }, [notes, accessToken, navigate])

    const onCreateNote = () => {
        createNote({ title: "", text: "" })
    }

    const onDeleteNote = async (id) => {
        await fetch("http://localhost:5000/delete_note", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ id }),
        })
    }

    const createNote = async (note) => {
        console.log("Creating note")
        const response = await fetch(`http://localhost:5000/create_note`, {
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
        const newNote = json.note
        setSelectedNote(newNote)
    }

    const updateNote = async (note) => {
        if (!note.id) {
            createNote(note)
        } else {
            console.log(selectedNote)
            const response = await fetch(
                `http://localhost:5000/update_note/${note.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        title: note.title,
                        text: note.text,
                        pinned: note.pinned,
                    }),
                }
            )
            const json = await response.json()
            const updatedNote = json.note
            console.log("Now updating")

            setSelectedNote(updatedNote)
        }
    }

    const onTogglePin = async (note) => {
        console.log("toggling", note)
        await fetch(`http://localhost:5000/update_note/${note.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ pinned: !note.pinned }),
        })
    }
    const getNoteById = async (id) => {
        console.log("getting note", id)
        const response = await fetch(`http://localhost:5000/note/${id}`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        })
        const json = await response.json()
        return json.note
    }
    const onSelectNote = async (id) => {
        if (tablet) setShowNotesBox(false)
        const note = await getNoteById(id)
        setSelectedNote(note)
    }

    const onSignOut = async () => {
        await fetch("http://localhost:5000/auth/signout", {
            method: "DELETE",
            credentials: "include",
        })
        setAccessToken("")
        navigate("/signin")
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
