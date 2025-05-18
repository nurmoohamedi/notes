import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getNotes, createNote, updateNoteServer, deleteNoteServer } from "../services/note.service";

const parseIsoDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formatted = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  return formatted;
};

// Async: получение заметок с сервера
export const getNotesFromServer = createAsyncThunk(
  "notes/getNotesFromServer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNotes();
      return response.data?.map((note) => ({
        id: note.id,
        name: note.name,
        text: note.description,
        tags: note.tags,
        createdDate: parseIsoDate(note.createDate),
      }));
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch notes");
    }
  }
);

// Async: сохранение заметки на сервер
export const addNoteToServer = createAsyncThunk(
  "notes/addNoteToServer",
  async (noteData, { rejectWithValue }) => {
    try {
      const response = await createNote(noteData);
      return {
        id: response.data.id,
        text: response.data.description,
        createdDate: parseIsoDate(response.data.createDate),
        tags: response.data.tags,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to save note");
    }
  }
);

// Async: обновление заметки на сервере
export const updateNoteOnServer = createAsyncThunk(
  "notes/updateNoteOnServer",
  async (updatedNote, { rejectWithValue }) => {
    try {
        debugger;
      const response = await updateNoteServer(updatedNote.id, updatedNote);
      return {
        id: response.data.id,
        text: response.data.description,
        createdDate: parseIsoDate(response.data.createDate),
        tags: response.data.tags,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update note");
    }
  }
);

// Async: удаление заметки на сервере
export const deleteNoteOnServer = createAsyncThunk(
  "notes/deleteNoteOnServer",
  async (id, { rejectWithValue }) => {
    try {
      await deleteNoteServer(id); // DELETE запрос
      return id; // Возвращаем id удалённой заметки
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete note");
    }
  }
);

const initialState = {
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [
        {
          id: 1,
          text: "Hi there!",
          createdDate: "05-04-2022",
          tags: ["#cool", "#awesome"],
        },
        {
          id: 2,
          text: "Damn I love Coding!",
          createdDate: "08-01-2022",
          tags: ["#coding"],
        },
      ],
  searchValue: "",
  searchNotes: [],
  searchValue: "",
  searchNotes: [],
  loading: false,
  error: null,
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
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    updateNote: (state, action) => {
      const { id, text } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) note.text = text;
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    addTag: (state, action) => {
      const { id, tags } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        const newTags = tags.split(" ").map((tag) => "#" + tag);
        note.tags = [...new Set([...note.tags, ...newTags])];
      }
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    deleteTag: (state, action) => {
      const { id, value } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.tags = note.tags.filter((tag) => tag !== value);
      }
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
      state.searchNotes = state.searchValue.includes("#")
        ? state.notes.filter((note) =>
            note.tags.some((tag) => tag.includes(state.searchValue))
          )
        : state.notes.filter((note) =>
            note.text.toLowerCase().includes(state.searchValue.toLowerCase())
          );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotesFromServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotesFromServer.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
        localStorage.setItem("notes", JSON.stringify(action.payload));
      })
      .addCase(getNotesFromServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Добавляем обработку addNoteToServer
      .addCase(addNoteToServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNoteToServer.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload);
        localStorage.setItem("notes", JSON.stringify(state.notes));
      })
      .addCase(addNoteToServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Добавляем обработку updateNoteOnServer
      .addCase(updateNoteOnServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNoteOnServer.fulfilled, (state, action) => {
        state.loading = false;
        const updatedNote = action.payload;
        const index = state.notes.findIndex(
          (note) => note.id === updatedNote.id
        );
        if (index !== -1) {
          state.notes[index] = updatedNote;
          localStorage.setItem("notes", JSON.stringify(state.notes));
        }
      })
      .addCase(updateNoteOnServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Добавляем обработку deleteNoteOnServer
      .addCase(deleteNoteOnServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNoteOnServer.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.notes = state.notes.filter((note) => note.id !== deletedId);
        localStorage.setItem("notes", JSON.stringify(state.notes));
      })
      .addCase(deleteNoteOnServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
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
