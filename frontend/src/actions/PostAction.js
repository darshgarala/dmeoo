import React from "react";
import toast, { Toaster } from "react-hot-toast";
import * as PostApi from "../api/PostRequest.js";
import * as PostDeleteApi from "../api/UploadRequest.js";
import axios from "axios";

export const deleteApost = (id, userId) => async (dispatch) => {
  dispatch({ type: "DELETE_POST_START" });
  console.log("object");
  try {
    console.log("=> => ", id, userId);
    // const { data } = await PostDeleteApi.deletePost(id, userId);
    // const { data } = await PostDeleteApi.deletePost(id, userId);
    const data = {
      userId: userId,
    };
    const data1 = await axios.delete(`http://localhost:8000/post/${id}`, {
      data,
    });
    console.log("back Data = >", data1.data.data);
    // dispatch({ type: "DELETE_POST_SUCCESS", data: data1.data.data });
  } catch (error) {
    console.log("eroror = ", error);
    dispatch({ type: "DELETE_POST_FAIL" });
  }
};

export const getTimelinePost = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostApi.getTimelinePost(id);
    console.log("get ", data);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const commentsOfPost =
  (text, id, userId, username, profileImg) => async (dispatch) => {
    try {
      console.log("object = ");
      const data = await PostApi.commentPost(
        text,
        id,
        userId,
        username,
        profileImg
      );
    } catch (error) {
      console.log(error);
    }
  };
