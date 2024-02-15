import React, { useState } from "react";
import "./Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction.js";
// import authRedecer from "../../reducers/authReducer.js";
function Auth() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.authRedecer.loading);

  const [isSignup, setIsSignup] = useState(false);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      isSignup &&
      (data.firstname === "" ||
        data.lastname === "" ||
        data.username === "" ||
        data.password === "" ||
        data.confirmpass === "")
    ) {
      toast.error("All field Require");
    } else if (isSignup && data.password !== data.confirmpass) {
      toast.error("Confirm Password Not match");
    } else if (isSignup) {
      console.log(data);
      dispatch(signUp(data));
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };
  return (
    <div className="Auth">
      {/* left side */}
      <Toaster position="top-right" reverseOrder={true} />
      <div className="a-left">
        <FontAwesomeIcon
          icon={faIcons}
          style={{
            color: "#f5c30c",
            fontSize: "220px",
            marginTop: "2px",
            transform: "8s",
          }}
          beatFade
        />
        <div className="Webname">
          <h1>Funny</h1>
          <h6>Explore the idea throughout the world</h6>
        </div>
      </div>

      {/* sign up page || log in page */}
      <div className="a-right">
        <form action="" className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignup ? "Sign Up" : "Login"}</h3>

          {isSignup && (
            <div>
              <input
                name="firstname"
                type="text"
                placeholder="First Name"
                className="infoInput"
                onChange={handleData}
                value={data.firstname}
              />
              <input
                name="lastname"
                type="text"
                placeholder="Last Name"
                className="infoInput"
                onChange={handleData}
                value={data.lastname}
              />
            </div>
          )}

          <div className="">
            <input
              name="username"
              type="text"
              placeholder="User Name"
              className="infoInput"
              onChange={handleData}
              value={data.username}
            />
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password "
              className="infoInput"
              onChange={handleData}
              value={data.password}
            />
            {isSignup && (
              <div>
                <input
                  name="confirmpass"
                  type="password"
                  placeholder="Confirm Password "
                  className="infoInput"
                  onChange={handleData}
                  value={data.confirmpass}
                />
              </div>
            )}
          </div>

          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignup((e) => !e);
                resetForm();
              }}
            >
              {isSignup
                ? "Already have an Account Login!"
                : "Don`t have an Account? Sign Up"}
            </span>
            <button
              className="button infoButton"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignup ? "Sign Up" : "Log In"}
            </button>
          </div>
        </form>
      </div>
      {/* <LogIn /> */}
    </div>
  );
}

export default Auth;
