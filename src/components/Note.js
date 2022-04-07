import "./../App.scss";
import {useState} from "react";
import tag_icon from "./../assets/hash.png"
import delete_icon from "./../assets/delete.png"

const NoteContainer = ({notes, addNote, deleteNote, addTag}) => {

    const [value, setValue] = useState("");
    const [tagValue, setTagValue] = useState("");
    const [tagMode, setTagMode] = useState(false);

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

    const handleDelete = (id) => {
        deleteNote(id)
    }

    const handleAddTag = (id) => {
        addTag(id, tagValue);
        setTagValue("")
        setTagMode(false);
    }

    const Tag = ({tag}) => <a className="tag">
        {tag}
        <span className="tag_delete">x</span>
    </a>

    return (
        <div className="notes">
            {
                notes.map(note => {
                    debugger
                    return (
                        <div className="note" key={note.id}>
                            <div className="note__text">
                                <textarea name="note" value={note.text} placeholder="Type text here..."/>
                            </div>

                            <div className="note__tag">
                                {
                                    tagMode
                                        ? (<div className="note__tag_add">
                                                <label htmlFor="tag" data-text="text">#</label>
                                                <input type="text" id="tag" placeholder="enter tag for example #cool"
                                                       value={tagValue} onChange={(e) => setTagValue(e.target.value)}/>
                                                <input type="button" value="add" onClick={() => handleAddTag(note.id)}/>
                                            </div>
                                        ) : (
                                            <div className="note__tag_tags">
                                                <div>
                                                    {note.tags?.map(tag => {
                                                        return <Tag tag={tag} key={tag}/>
                                                    })}
                                                </div>
                                                <div className="tag_switch" onClick={() => setTagMode(true)}>
                                                    <img src={tag_icon} alt="icon" className="tag_icon"/>
                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                            <div className="divider"/>
                            <div className="note__info">
                                <div><a href="#">{note.createdDate}</a></div>
                                <div onClick={() => handleDelete(note.id)}>
                                    <a href="#"><img src={delete_icon} alt="delete_icon" width="25x" className="tag_icon"/></a>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

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