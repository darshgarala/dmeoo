import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const getUser = (userId) => API.get(`/user/${userId}`);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUser = (query) => API.put("/user/search", { query: query });
export const getAllUserForFollowAndUnfollow = () => API.get("/user/");
export const followUser = (id, data) =>
  API.put(`/user/${id}/follow`, { currentLoggedInId: data });
export const UnfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, {"currentLoggedInId":data});
