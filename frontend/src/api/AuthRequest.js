import axios from "axios";

const API = axios.create({
  baseURL: "https://social-media-webapplication-1.onrender.com",
});

export const signUp = (formData) => API.post("/auth/register", formData);
export const logIn = (formData) => API.post("/auth/login", formData);
