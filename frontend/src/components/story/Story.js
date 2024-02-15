import React, { useState, useRef } from "react";
import "./Story.css";
import Stories from "react-insta-stories";
import p1 from "../../img/p1.jpg";
import p2 from "../../img/p1.jpg";
import p3 from "../../img/p1.jpg";
import p4 from "../../img/p1.jpg";
import { ReactDialogBox } from "react-js-dialog-box";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { uploadImgStory, uploadStory } from "../../actions/uploadAction";

function Story({ location }) {
  // const stori = [p1, p1, p1];
  const user = useSelector((state) => state.authRedecer.authData);

  const [isOpen, setIsopen] = useState(false);
  const imageRef = useRef();
  const [image, setImage] = useState(null);

  const stories = [
    {
      type: "image",
      url: "http://localhost:8000/images/defaultCover.png",
      duration: 1000,
    },
    {
      type: "image",
      url: "http://localhost:8000/images/defaultCover1.jpg",
      duration: 1000,
    },
    {
      url: "http://localhost:8000/images/1706123663880statue.mp4",
      duration: 1000,
      type: "video",
    },
  ];

  let h = stories.length;
  // h = h * 1000;
  const openBox = () => {
    setIsopen(true);
  };

  const closeBox = () => {
    setTimeout(() => {
      setIsopen(false);
    }, h);
  };

  const handleStory = () => {
    console.log("hiiiiiiiii");
  };

  const dispatch = useDispatch();
  const reset = () => {
    setImage(null);
  };
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      console.log("img", img);
      // setImage(img);

      const newPost = {
        userId: user.data._id,
      };

      if (img) {
        const data = new FormData();
        const filename = Date.now() + img.name;

        data.append("name", filename);
        data.append("file", img);

        newPost.image = filename;
        console.log("newpost = ", newPost);
        try {
          dispatch(uploadImgStory(data));
        } catch (error) {
          console.log("error in postshare", error);
        }
      }
      dispatch(uploadStory(newPost));
      reset();
    }
  };
  return (
    <div className="header">
      {location !== "profilepage" ? (
        <>
          <div>
            <button
              style={{
                backgroundColor: "white",
                width: "90px",
                height: "90px",
                borderRadius: "100px",
                border: " 2px dashed red",
                cursor: "pointer",
              }}
              onClick={openBox}
            >
              hello
            </button>
            {isOpen && (
              <ReactDialogBox
                closeBox={closeBox}
                modalWidth="60%"
                headerBackgroundColor="gray"
                headerTextColor="black"
                headerHeight="65"
                closeButtonColor="black"
                bodyBackgroundColor="white"
                bodyTextColor="black"
                bodyHeight="700px"
                headerText="Title"
              >
                <div className="dbox">
                  <Stories
                    stories={stories}
                    className="story"
                    width={920}
                    height={700}
                  />
                </div>
              </ReactDialogBox>
            )}
          </div>
        </>
      ) : (
        <>
          <button
            // onClick={openBox}
            style={{
              backgroundColor: "black",
              width: "90px",
              height: "90px",
              borderRadius: "100px",
            }}
          >
            <div style={{ display: "none" }}>
              <input
                type="file"
                // name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
            <FontAwesomeIcon
              icon={faPlus}
              style={{ color: "#FFD43B", fontSize: "40px" }}
              onClick={() => {
                imageRef.current.click();
              }}
            />
          </button>
          {isOpen && (
            <ReactDialogBox
              closeBox={closeBox}
              modalWidth="60%"
              headerBackgroundColor="red"
              headerTextColor="white"
              headerHeight="65"
              closeButtonColor="white"
              bodyBackgroundColor="white"
              bodyTextColor="black"
              bodyHeight="700px"
              headerText="Title"
            >
              <div className="dbox">
                <Stories
                  stories={stories}
                  className="story"
                  width={920}
                  height={700}
                />
              </div>
            </ReactDialogBox>
          )}
        </>
      )}
    </div>
  );
}

export default Story;
