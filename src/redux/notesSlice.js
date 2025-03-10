import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [
        {
            id: 1,
            text: "Hi there!",
            createdDate: "05-04-2022",
            tags: ["#cool", "#awesome"]
        },
        {
            id: 2,
            text: "Damn I love Coding!",
            createdDate: "08-01-2022",
            tags: ["#coding"]
        }
    ],
    searchValue: "",
    searchNotes: []
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.notes.push(action.payload);
            localStorage.setItem("notes", JSON.stringify(state.notes));
        },
        deleteNote: (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
            localStorage.setItem("notes", JSON.stringify(state.notes));
        },
        updateNote: (state, action) => {
            const { id, text } = action.payload;
            const note = state.notes.find(note => note.id === id);
            if (note) note.text = text;
            localStorage.setItem("notes", JSON.stringify(state.notes));
        },
        addTag: (state, action) => {
            const { id, tags } = action.payload;
            const note = state.notes.find(note => note.id === id);
            if (note) {
                const newTags = tags.split(" ").map(tag => "#" + tag);
                note.tags = [...new Set([...note.tags, ...newTags])];
            }
            localStorage.setItem("notes", JSON.stringify(state.notes));
        },
        deleteTag: (state, action) => {
            const { id, value } = action.payload;
            const note = state.notes.find(note => note.id === id);
            if (note) {
                note.tags = note.tags.filter(tag => tag !== value);
            }
            localStorage.setItem("notes", JSON.stringify(state.notes));
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
            state.searchNotes = state.searchValue.includes("#")
                ? state.notes.filter(note => note.tags.some(tag => tag.includes(state.searchValue)))
                : state.notes.filter(note => note.text.toLowerCase().includes(state.searchValue.toLowerCase()));
        }
    }
});

export const {
  addNote,
  deleteNote,
  updateNote,
  addTag,
  deleteTag,
  setSearchValue,
} = notesSlice.actions;
export default notesSlice.reducer;