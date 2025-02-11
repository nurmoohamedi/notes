import "./../App.scss";
import {useState} from "react";
import tag_icon from "./../assets/hash.png"
import delete_icon from "./../assets/delete.png"
import add_icon from "./../assets/add_icon.png"

const Tag = ({tag, deleteTag, note}) => {
    return (
        <a className="tag">
            {tag}
            <span className="tag_delete" onClick={()=>deleteTag(note.id, tag)}>x</span>
        </a>
    )
}

const Note = ({note, deleteNote, updateNote, addTag, deleteTag}) => {

    const [tagValue, setTagValue] = useState("");
    const [tagMode, setTagMode] = useState(false);

    const handleDelete = (id) => {
        deleteNote(id)
    }
    const handleChange = (e) => {
        updateNote(note.id, e.target.value)
    }
    const handleAddTag = (id) => {
        addTag(id, tagValue);
        setTagValue("")
        setTagMode(false);
    }

    return (
        <div className="note" key={note.id}>
            <div className="note__text">
                <textarea name="note" value={note.text} placeholder="Type text here..." onChange={handleChange}/>
            </div>

            <div className="note__tag">
                {
                    tagMode
                        ? (<div className="note__tag_add">
                                <label htmlFor="tag" data-text="text">#</label>
                                <input type="text" id="tag" placeholder="enter tag for example #cool"
                                       value={tagValue} onChange={(e) => setTagValue(e.target.value)}/>
                                <button onClick={() => handleAddTag(note.id)}>
                                    <img src={add_icon} alt="add_icon" width="20px" className="tag_icon"/>
                                </button>
                            </div>
                        ) : (
                            <div className="note__tag_tags">
                                <div className="tags">
                                    {note.tags?.map(tag => {
                                        return <Tag tag={tag} key={tag} deleteTag={deleteTag} note={note} />
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
                    <a href="#"><img src={delete_icon} alt="delete_icon" width="23x" className="tag_icon"/></a>
                </div>
            </div>
        </div>
    )
}

export default Note;