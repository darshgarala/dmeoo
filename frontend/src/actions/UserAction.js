import * as uploadApi from "../api/UserRequest.js";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    console.log("id = ", id, "formdta ", formData);
    const newData = await uploadApi.updateUser(id, formData);
    console.log("newData", newData);
    toast.success("Update Profile");
    dispatch({ type: "UPDATING_SUCCESS", data: newData });
  } catch (error) {
    console.log(error);
    toast.error("some Error accure");
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (id, user) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER", data: id });
  // console.log("=");
  const data = await uploadApi.followUser(id, user);
  console.log("data follow = ", data);
};

export const UnfollowUser = (id, user) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER", data: id });
  console.log("= = = =");
  const data = await uploadApi.UnfollowUser(id, user);
  console.log("data un follow = ", data);
};
export default function AuthAction() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
    </>
  );
}
