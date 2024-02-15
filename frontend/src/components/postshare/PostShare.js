import React, { useState, useRef } from "react";
import "./PostShare.css";
// import img from "../../img/profileImg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faCalendarDays,
  faLocationDot,
  faCirclePlay,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction.js";

function PostShare() {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const desc = useRef();
  const user = useSelector((state) => state.authRedecer.authData);
  console.log(" user PostShare ", user.data.profilePicture);

  const dispatch = useDispatch();

  const onImageChange = (e) => {
    // console.log(" = ", e.target.files);
    // console.log(" ====== ", e.target.files[0]);

    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };
  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image === null || desc === null) {
      return;
    }
    const newPost = {
      userId: user.data._id,
      desc: desc.current.value,
      userProfileImage: user.data.profilePicture,
      username: user.data.username,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;

      data.append("name", filename);
      data.append("file", image);

      newPost.image = filename;
      console.log("share =", newPost);
      try {
        console.log("data ", data);
        dispatch(uploadImage(data));
      } catch (error) {
        console.log("error in postshare", error);
      }
    }
    try {
      dispatch(uploadPost(newPost));
    } catch (error) {
      console.log("Error in ...", error);
    }
    reset();
  };

  return (
    <div className="PostShare">
      <img
        src={
          user.data.profilePicture
            ? `http://localhost:8000/images/${user.data.profilePicture}`
            : "http://localhost:8000/images/defaultCover.png"
        }
        alt=""
      />
      <div>
        <input ref={desc} required type="text" placeholder="what`s happening" />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)", fontSize: "14px", gap: "4px" }}
            onClick={() => {
              imageRef.current.click();
            }}
          >
            <FontAwesomeIcon icon={faImage} />
            <span>Photo</span>
          </div>
          <div
            className="option"
            style={{ color: "var(--video)", fontSize: "14px", gap: "4px" }}
          >
            <FontAwesomeIcon icon={faCirclePlay} />
            <span>Video</span>
          </div>
          <div
            className="option"
            style={{ color: "var(--location)", fontSize: "14px", gap: "4px" }}
          >
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Location</span>
          </div>
          <div
            className="option"
            style={{ color: "var(--schedule)", fontSize: "14px", gap: "4px" }}
          >
            <FontAwesomeIcon icon={faCalendarDays} />
            <span>Schedule</span>
          </div>
          <button className="button ps-button" onClick={handleSubmit}>
            {loading ? "Uploading..." : "share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              // name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <FontAwesomeIcon
              icon={faCircleXmark}
              onClick={() => setImage(null)}
              style={{ cursor: "pointer" }}
            />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostShare;
