import "./App.css"
import Notes from "./Notes"
import NoteView from "./NoteView"
import { useState, useEffect, useRef, useCallback } from "react"

// IMPORT FROM NODE BACKEND WHCIH RETRIEVED DATA FROM MONGODB
// PROPERTIES TO ADD:
//   - DATE CREATED,
//   - PINNED
const throttleImpl = (cb, delay) => {
    let isThrottled = false
    return (...args) => {
        if (isThrottled) return
        isThrottled = true
        cb(...args)
        setTimeout(() => {
            isThrottled = false
        }, delay)
    }
}

function useThrottle(cb, delay) {
    const cbRef = useRef(cb)
    useEffect(() => {
        cbRef.current = cb
    })
    return useCallback(
        throttleImpl((...args) => cbRef.current(...args), delay),
        [delay]
    )
}

const App = () => {
    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState({})
    const [showPinnedOnly, setShowPinnedOnly] = useState(false)

    // const invokedThrottle = useThrottle(, 100)

    useEffect(() => {
        console.log("fetching notes")
        async function fetchData() {
            let response = await fetch("http://localhost:5000/notes")
            let notes = await response.json()
            setNotes(notes)
        }
        fetchData()
    }, [notes])

    const onCreateNote = () => {
        createNote({ title: "", text: "" })
    }

    const onDeleteNote = async (id) => {
        await fetch("http://localhost:5000/delete_note", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })
    }

    const createNote = async (note) => {
        const response = await fetch(`http://localhost:5000/create_note`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
        }

        const response = await fetch(
            `http://localhost:5000/update_note/${note.id}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: note.title,
                    text: note.text,
                    pinned: note.pinned,
                }),
            }
        )
        const json = await response.json()
        const updatedNote = json.note
        setSelectedNote(updatedNote)
    }

    const onTogglePin = async (note) => {
        console.log("toggling", note)
        const response = await fetch(
            `http://localhost:5000/update_note/${note.id}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pinned: !note.pinned }),
            }
        )
    }

    const getNoteById = async (id) => {
        const response = await fetch(`http://localhost:5000/note/${id}`)
        const json = await response.json()
        return json.note
    }
    const onSelectNote = async (id) => {
        const note = await getNoteById(id)
        setSelectedNote(note)
    }

    return (
        <div className="container">
            <Notes
                notes={notes}
                onSelectNote={onSelectNote}
                onCreateNote={onCreateNote}
                onDeleteNote={onDeleteNote}
                onTogglePin={onTogglePin}
                showPinnedOnly={showPinnedOnly}
                setShowPinnedOnly={setShowPinnedOnly}
            />
            <NoteView note={selectedNote} updateNote={updateNote} />
        </div>
    )
}

// TODO make plus button for create notes

export default App
