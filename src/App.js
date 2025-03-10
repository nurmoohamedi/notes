import "./App.scss";
import SearchBar from "./components/SearchBar";
import NoteContainer from "./components/NoteContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  addNote,
  deleteNote,
  updateNote,
  addTag,
  deleteTag,
  setSearchValue,
} from "./redux/notesSlice";

const App = () => {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);
    const searchValue = useSelector(state => state.notes.searchValue);
    const searchNotes = useSelector(state => state.notes.searchNotes);

    // useEffect(() => {
    //     localStorage.setItem('notes', JSON.stringify(notes));
    //     debugger;
    // }, [notes]);

    return (
        <>
            <div className="wrapper">
                <SearchBar
                    notes={notes}
                    searchValue={searchValue}
                    setSearchValue={(value) => dispatch(setSearchValue(value))}
                />
                <NoteContainer
                    notes={searchValue.length === 0 ? notes : searchNotes}
                    addNote={(note) => dispatch(addNote(note))}
                    deleteNote={(id) => dispatch(deleteNote(id))}
                    updateNote={(id, text) => dispatch(updateNote({ id, text }))}
                    addTag={(id, value) => dispatch(addTag({ id, tags: value }))}
                    deleteTag={(id, value) => dispatch(deleteTag({ id, value }))}
                />
                <div className="footer">
                    Made By <span>Nurmoohamedi</span>
                    <p>Copyright © 2022 Noor Inc.</p>
                </div>
            </div>
        </>
    );
};

// export default () => useSelector((state) => <App {...state.notes} />);
export default () => useSelector((state) => <App {...state.notes} />);