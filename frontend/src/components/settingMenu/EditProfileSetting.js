import React, { useState } from "react";
import ProfileSide from "../profileside/ProfileSide";
import SettingMenu from "./SettingMenu";
import RightSide from "../rightside/RightSide";
import "./EditProfileSetting.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import {
  uploadCoverImg,
  uploadProfileImg,
} from "../../actions/uploadAction.js";
import { updateUser } from "../../actions/UserAction.js";
const EditProfileSetting = () => {
  const user = useSelector((state) => state.authRedecer.authData);
  const [formData, setFormData] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const handleData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;

    console.log("UserData = ", UserData);
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        console.log("data profileImage = ", data);
        dispatch(uploadProfileImg(data));
      } catch (err) {
        console.log("error in err= ", err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        console.log("data coverImage = ", data);
        dispatch(uploadCoverImg(data));
      } catch (err) {
        console.log("error in err= ", err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setFormData("");
  };
  return (
    <>
      <div className="Home">
        <ProfileSide l ocation="setting"></ProfileSide>
        <div className= "EditProfile">
          {/* <form
            action=""
            style={{ marginTop: "90px" }}
            className="infoForm authForm"
          > */}
          <div className="dialogd1">
            <label htmlFor="">firstname : </label>
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              className="infoInput"
              style={{ gap: "10px" }}
              onChange={handleData}
              value={formData.firstname}
            />
            <div >
              <label htmlFor="">Lastname : </label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                className="infoInput"
                onChange={handleData}
                style={{ gap: "10px" }}
                value={formData.lastname}
              />
            </div>
          </div>

          <div className="dialogd2">
            <label htmlFor="">Work at : </label>
            <input
              type="text"
              placeholder="Work at"
              name="worksAt"
              onChange={handleData}
              className="infoInput"
              value={formData.worksAt}
            />
          </div>
          <div className="dialogd3">
            <label htmlFor="">Lives In : </label>
            <input
              type="text"
              placeholder="Lives In"
              name="livesin"
              onChange={handleData}
              className="infoInput"
              value={formData.livesin}
            />
            <label htmlFor="">Country : </label>
            <input
              type="text"
              placeholder="Country"
              name="country"
              onChange={handleData}
              className="infoInput"
              value={formData.country}
            />
          </div>
          <div className="dialogd4">
            <label htmlFor="">Relationship Status : </label>
            <input
              type="text"
              className="infoInput"
              placeholder="Relationship Status"
              onChange={handleData}
              name="relationship"
              value={formData.relationship}
            />
          </div>
          <div className="dialogd4">
            <label htmlFor="">About : </label>
            <input
              type="text"
              className="infoInput"
              placeholder="About"
              onChange={handleData}
              name="about"
              value={formData.about}
            />
          </div>
          <div>
            ProfileImage
            <input type="file" onChange={onImageChange} name="profileImage" />
            Cover Image
            <input type="file" onChange={onImageChange} name="coverImage" />
          </div>
          <button className="button infoButton" onClick={handleSubmit}>
            Update
          </button>
          {/* </form> */}
        </div>
        <RightSide />
      </div>
    </>
  );
};

export default EditProfileSetting;
