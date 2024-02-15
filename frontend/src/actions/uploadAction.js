import * as uploadApi from "../api/UploadRequest.js";

export const uploadImage = (data) => async (dispatch) => {
  try {
    await uploadApi.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};
export const uploadProfileImg = (data) => async (dispatch) => {
  try {
    console.log("object 1", data);
    await uploadApi.uploadProfileImg(data);
  } catch (error) {
    console.log("uploadProfileImg =>", error);
  }
};

export const uploadCoverImg = (data) => async (dispatch) => {
  try {
    console.log("object 2 ", data);
    await uploadApi.uploadCoverImg(data);
  } catch (error) {
    console.log(" uploadCoverImg => ", error);
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost = await uploadApi.uploadPost(data);
    console.log(newPost);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};

export const uploadImgStory = (data) => async (dispatch) => {
  try {
    await uploadApi.uploadImgStory(data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadStory = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost = await uploadApi.uploadStory(data);
    // console.log("uploadStory = ", newPost);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};
