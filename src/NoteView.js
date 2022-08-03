const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
}
const NoteView = ({ note, updateNote }) => {
    const date = note.createdAt ? new Date(note.updatedAt) : Date.now()
    return (
        <div className="noteView">
            <textarea
                placeholder="Title"
                className="noteViewTitle"
                value={note.title}
                onChange={(e) => updateNote({ ...note, title: e.target.value })}
            ></textarea>
            <p>{new Date(date).toLocaleDateString("en-GB", dateOptions)}</p>
            <textarea
                placeholder="This is your note text!"
                className="noteViewText"
                value={note.text}
                onChange={(e) => updateNote({ ...note, text: e.target.value })}
            ></textarea>
        </div>
    )
}

export default NoteView
