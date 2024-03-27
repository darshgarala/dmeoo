import React from "react";
import toast, { Toaster } from "react-hot-toast";
import * as AuthApi from "../api/AuthRequest.js";

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    toast.success("Login Successfully");
  } catch (error) {
    console.log(error);
    toast.error("username OR password Wrong");
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    
    console.log("data = ", data);

    dispatch({ type: "AUTH_SUCCESS", data: data });
    if (data.message === "username is already register") {
      toast.error("username is already register");
    } else if (data.message === "register successfully") {
      toast.success("register successfully");
    }
  } catch (error) {
    // console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};

export default function AuthAction() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
    </>
  );
}
