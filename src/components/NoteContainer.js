import "./../App.scss";
import {useState} from "react";
import tag_icon from "./../assets/hash.png"
import delete_icon from "./../assets/delete.png"
import Note from "./Note";

const NoteContainer = ({notes, addNote, deleteNote, updateNote, addTag, deleteTag}) => {

    const [value, setValue] = useState("");

    const handleChange = (e) => {
        const value = e.target.value
        if (value.length <= 200)
            setValue(value)
    }
    const handleSave = () => {
        const currentDate = new Date();
        addNote({
            id: notes.length + 1,
            text: value,
            tags: [],
            createdDate: currentDate.toLocaleString()
        })
        setValue("");
    }

    return (
        <div className="notes">

            {notes?.map(note => <Note key={note.id} note={note} deleteNote={deleteNote} addTag={addTag} updateNote={updateNote} deleteTag={deleteTag}/>)}

            <div className="note note_add">
                <div className="note__text">
                    <textarea onChange={handleChange} name="note" value={value} placeholder="Type text here..."/>
                </div>
                <div className="divider"/>
                <div className="note__info">
                    <div>{200 - value.length} remaining</div>
                    <button className="button" onClick={value.length !== 0 && handleSave}>save</button>
                </div>
            </div>
        </div>
    )
}

export default NoteContainer;