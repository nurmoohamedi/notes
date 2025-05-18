import httpClient from "./httpClient";
// import { Note, LoginDto, SignUpDto } from "./types.ts";

const API_URL = process.env.API_URL || "http://localhost:3010";

export const login = async (reqBody) => {
  return httpClient.put(`${API_URL}/auth/login`, reqBody);
};

export const signUp = async (reqBody) => {
  return httpClient.post(`${API_URL}/auth/signup`, reqBody);
};
