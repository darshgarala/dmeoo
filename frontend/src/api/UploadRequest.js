import axios from "axios";

const API = axios.create({
  baseURL: "https://social-media-webapplication-1.onrender.com",
});
// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }

//   return req;
// });
export const uploadImage = (data) => API.post("/upload", data);
export const uploadPost = (data) => API.post("/post", data);
export const deletePost = async (id, userId) => {
  const data = {
    userId: userId,
  };
  API.delete(`/post/${id}`, { data });
};

export const uploadImgStory = (data) => API.post("/upload/story", data);
export const uploadStory = (data) => API.post("/post/story", data);
export const uploadProfileImg = (data) => API.post("/upload/", data);
export const uploadCoverImg = (data) => API.post("/upload/", data);
