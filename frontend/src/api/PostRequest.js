import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const getTimelinePost = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) =>
  API.put(`/post/${id}/like`, { userId: userId });

export const getAllPost = () => API.get("/post/allpost");
export const commentPost = (text, id, userId, username, profileImg) => {
  // const data = {
  //   text: text,
  //   id: id,
  // };
  API.put(`/post/${id}/comment`, {
    text: text,
    userId: userId,
    username: username,
    profileImg: profileImg,
  });
};
// console.log(" = =>>>>", getAllPost);
