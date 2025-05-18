import React, { useEffect } from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar";
import NoteContainer from "./components/NoteContainer";
import LoginPageContainer from "./components/LoginPage";
import { useSelector, useDispatch } from "react-redux";
import {
  addNote,
  deleteNote,
  updateNote,
  addTag,
  deleteTag,
  setSearchValue,
  getNotesFromServer
} from "./redux/notesSlice";
import { logout } from "./redux/authSlice";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const searchValue = useSelector((state) => state.notes.searchValue);
  const searchNotes = useSelector((state) => state.notes.searchNotes);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  useEffect(() => {
  dispatch(getNotesFromServer());
}, [dispatch]);

  return (
    <>
      <div className="wrapper">
        <SearchBar
          notes={notes}
          searchValue={searchValue}
          setSearchValue={(value) => dispatch(setSearchValue(value))}
          handleLogout={handleLogout}
        />
        <NoteContainer
          notes={searchValue.length === 0 ? notes : searchNotes}
          addNote={(note) => dispatch(addNote(note))}
          deleteNote={(id) => dispatch(deleteNote(id))}
          addTag={(id, value) => dispatch(addTag({ id, tags: value }))}
          deleteTag={(id, value) => dispatch(deleteTag({ id, value }))}
          updateNote={(id, text) => dispatch(updateNote({ id, text }))}
        />
        <div className="footer">
          Made By <span>Nurmoohamedi</span>
          <p>Copyright © 2022 Noor Inc.</p>
        </div>
      </div>
    </>
  );
};

const MainApp = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <App /> : <Navigate to="/login" />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <App /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPageContainer /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};
export default MainApp;
