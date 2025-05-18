import httpClient from "./httpClient";

const API_URL = process.env.API_URL || "http://localhost:3010";

export const getNotes = async () => {
  return httpClient.get(`${API_URL}/notes`);
};

export const createNote = async (body) => {
  return httpClient.post(`${API_URL}/notes`, body);
};

export const updateNoteServer = async (id, body) => {
  return httpClient.patch(`${API_URL}/notes/${body.id}`, body);
};

export const deleteNoteServer = async (noteID) => {
  return httpClient.delete(`${API_URL}/notes/${noteID}`);
};
