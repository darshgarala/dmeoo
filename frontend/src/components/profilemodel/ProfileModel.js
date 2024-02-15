// import { useDisclosure } from "@mantine/hooks";
// import { Modal, Button } from "@mantine/core";
import React, { useState, useEffect } from "react";
import "react-js-dialog-box/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ReactDialogBox } from "react-js-dialog-box";
import "./ProfileModel.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  uploadCoverImg,
  uploadProfileImg,
} from "../../actions/uploadAction.js";
import { updateUser } from "../../actions/UserAction";

function ProfileModel({ data }) {
  //   const [opened, { open, close }] = useDisclosure(false);
  const user = useSelector((state) => state.authRedecer.authData);
  console.log("user in modelprofile", user);
  const [isOpen, setIsopen] = useState(false);

  const openBox = () => {
    setIsopen(true);
  };

  const closeBox = () => {
    setIsopen(false);
  };

  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
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
    closeBox(true);
    setFormData("");
  };

  return (
    <>
      <div>
        <FontAwesomeIcon
          style={{
            cursor: "pointer",
            color: "var(--gray)",
            fontSize: "20px",
            padding: "20px 20px",
          }}
          icon={faPenToSquare}
          onClick={openBox}
        />

        {isOpen && (
          <>
            <ReactDialogBox
              closeBox={closeBox}
              modalWidth="60%"
              headerBackgroundColor="#242d49"
              headerTextColor="white"
              headerHeight="18"
              closeButtonColor="white"
              bodyBackgroundColor="white"
              bodyTextColor="black"
              bodyHeight="450px"
              headerText="Your Info"
            >
              <form action="" className="infoForm authForm">
                <div className="dialogd1">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstname"
                    className="infoInput"
                    style={{ gap: "10px" }}
                    onChange={handleData}
                    value={formData.firstname}
                  />
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
                <div className="dialogd2">
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
                  <input
                    type="text"
                    placeholder="Lives In"
                    name="livesin"
                    onChange={handleData}
                    className="infoInput"
                    value={formData.livesin}
                  />
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
                  <input
                    type="file"
                    onChange={onImageChange}
                    name="profileImage"
                  />
                  Cover Image
                  <input
                    type="file"
                    onChange={onImageChange}
                    name="coverImage"
                  />
                </div>
                <button className="button infoButton" onClick={handleSubmit}>
                  Update
                </button>
              </form>
            </ReactDialogBox>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileModel;
