import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div id="notFoundWrapper">
            <h1 className="notFoundHeading">404 Not Found</h1>
            <Link to="/home">Create a note?</Link>
        </div>
    )
}

export default NotFound
