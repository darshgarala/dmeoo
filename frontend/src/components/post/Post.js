import React, { useEffect, useRef, useState } from "react";
import "./Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrashCan,
  faComment,
  faShare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../api/PostRequest";
import { commentsOfPost, deleteApost } from "../../actions/PostAction";
import { deletePost } from "../../api/UploadRequest";

const Post = ({ data, edit }) => {
  const user = useSelector((state) => state.authRedecer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user.data._id));
  const [likes, setLikes] = useState(data.likes.length);
  // console.log("=>user ho bhai", user);
  const [img, setImg] = useState("");
  const myArray = data.image.split(".");

  console.log("data== ", data);

  const dispatch = useDispatch();

  useEffect(() => {
    setImg(myArray[1]);
  }, []);

  const handleLike = (prev) => {
    setLiked((prev) => !prev);
    likePost(data._id, user.data._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const [sid, setSid] = useState({ sidd: "" });

  const deletePostfront = (e) => {
    if (e.target.value === null || user.data._id === "") {
      return;
    } else {
      const dataAll = e.target.value;
      dispatch(deleteApost(dataAll, user.data._id));
    }
  };

  const [seecomment, setSeecomment] = useState(false);
  const handleComment = () => {
    setSeecomment(true);
  };

  const [commentdata, setcommentdata] = useState({
    commentInput: "",
  });
  const handledata = (e) => {
    setcommentdata({ ...commentdata, [e.target.name]: e.target.value });
  };

  const commentsubmit = () => {
    if (commentdata.commentInput === "") {
      return;
    }
    console.log(commentdata.commentInput, data._id);
    dispatch(
      commentsOfPost(
        commentdata.commentInput,
        data._id,
        user.data._id,
        user.data.username,
        user.data.profilePicture
      )
    );
    setSeecomment(false);
  };

  const shareComment = () => {
    if (commentdata.commentInput === "") {
      return;
    }
    dispatch(
      commentsOfPost(
        commentdata.commentInput,
        data._id,
        user.data._id,
        user.data.username,
        user.data.profilePicture
      )
    );
    setSeecomment(false);
  };
  return (
    <div className="Post">
      <div className="profileforhome">
        <img
          src={
            data.userProfileImage
              ? `http://localhost:8000/images/${data.userProfileImage}`
              : "http://localhost:8000/images/defaultCover.png"
          }
          alt=""
        />
        <h4>{data.username}</h4>
      </div>
      <div>
        <hr />
      </div>

      {img === "mp4" ? (
        <>
          <video
            controls
            autoPlay
            loop
            src={data.image ? `http://localhost:8000/images/${data.image}` : ""}
            type="video/mp4"
          ></video>
        </>
      ) : (
        <>
          <img
            src={data.image ? `http://localhost:8000/images/${data.image}` : ""}
            alt=""
          />
        </>
      )}
      <div className="postReact">
        <div onClick={handleLike}>
          {liked ? (
            <FontAwesomeIcon
              icon={faHeart}
              style={{
                fontSize: "18px",
                cursor: "pointer",
                gap: "10px",
                color: "red",
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faHeart}
              style={{ fontSize: "18px", cursor: "pointer", gap: "10px" }}
            />
          )}
        </div>
        <div onClick={handleComment}>
          <FontAwesomeIcon
            icon={faComment}
            style={{ fontSize: "18px", cursor: "pointer", gap: "10px" }}
          />
        </div>
        <FontAwesomeIcon
          icon={faShare}
          style={{ fontSize: "18px", cursor: "pointer", gap: "10px" }}
        />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "14px" }}>{likes}</span>
      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>{" "}
        <span>{data.desc}</span>
        <div>
          {/* <span> */}
          {seecomment ? (
            <>
              {data.comments.map((record, key) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "20px",
                      }}
                    >
                      {console.log("record = ", record)}
                      <img
                        className="imgOfcomment"
                        src={
                          record.profileImg
                            ? `http://localhost:8000/images/${record.profileImg}`
                            : "http://localhost:8000/images/defaultCover.png"
                        }
                        alt=""
                      />
                      <h6 style={{ marginLeft: "20px", marginTop: "20px" }}>
                        {record.name}
                      </h6>
                      <h5 style={{ marginLeft: "20px", marginTop: "20px" }}>
                        {record.text}
                      </h5>
                    </div>
                  </>
                );
              })}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h4>{user.data.username}</h4>
                <form
                  style={{ marginTop: "12px" }}
                  action=""
                  onSubmit={commentsubmit}
                >
                  <input
                    style={{
                      outline: "none",
                      // border: "none",
                      borderTop: "1px solid gray",
                      borderLeft: "1px solid gray",
                      borderRight: "1px solid gray",
                      borderBottom: "2px solid black",
                      borderBottomWidth: "4px",
                      borderBottomRightRadius: "10px",
                      borderBottomLeftRadius: "10px",
                      borderRadius: "20px",
                    }}
                    type="text"
                    placeholder="Comments..."
                    name="commentInput"
                    onChange={handledata}
                    value={commentdata.commentInput}
                  />
                  <FontAwesomeIcon
                    style={{
                      marginLeft: "10px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                    onClick={shareComment}
                    icon={faPlus}
                  ></FontAwesomeIcon>
                </form>
              </div>
            </>
          ) : (
            ""
          )}
          {/* </span> */}
          <div style={{ marginTop: "10px" }}>
            {" "}
            <span style={{ color: "ActiveBorder" }}>
              {data.comments.length}{" "}
            </span>{" "}
            <span style={{ fontFamily: "monospace" }}>comments</span>
          </div>
        </div>
      </div>
      <div>
        {edit === "yes" ? (
          <>
            <button
              onClick={deletePostfront}
              name="sidd"
              value={data._id}
              className="deletebtn"
            >
              DELETE
            </button>
          </>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default Post;
