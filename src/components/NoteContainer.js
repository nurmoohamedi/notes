import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "./../App.scss";
import Note from "./Note";
import { addNoteToServer, updateNoteOnServer, deleteNoteOnServer } from "../redux/notesSlice";

const NoteContainer = ({
  notes,
  //   addNote,
  //   deleteNote,
  updateNote,
  addTag,
  deleteTag,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const timeoutRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 200) setValue(value);
  };
  const handleSave = () => {
    // const currentDate = new Date();
    dispatch(
      addNoteToServer({
        id: notes.length + 1,
        name: "Note" + (notes.length + 1),
        description: value,
        tags: [],
        // createdDate: currentDate.toLocaleString()
      })
    );
    setValue("");
  };

  const handleUpdate = (id, value) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(updateNoteOnServer({ id, ...value }));
    }, 1000);
  };

  const updateNoteDispatch = (id, text) => {
    handleUpdate(id, { description: text });
    updateNote(id, text);
  };
  const deleteNote = (id) => dispatch(deleteNoteOnServer(id));

  const addTagHandler = (id, value) => {
    addTag(id, value);
    handleUpdate(id, { tags: value });
  };
  const deleteTagHandler = (id, value) => {
    deleteTag(id, value);
  };
  

  return (
    <div className="notes">
      {notes?.map((note) => (
        <Note
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          addTag={addTagHandler}
          updateNote={updateNoteDispatch}
          deleteTag={deleteTagHandler}
        />
      ))}

      <div className="note note_add">
        <div className="note__text">
          <textarea
            onChange={handleChange}
            name="note"
            value={value}
            placeholder="Type text here..."
          />
        </div>
        <div className="divider" />
        <div className="note__info">
          <div>{200 - value.length} remaining</div>
          <button className="button" onClick={value.length !== 0 && handleSave}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteContainer;
