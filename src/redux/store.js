import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    auth: authReducer,
  },
});