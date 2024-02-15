import React from "react";
import cover from "../../img/cover.png";
import profileImg from "../../img/profileImg.png";
import "./ProfileCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import ProfileCard from
function ProfileCard({ location }) {
  // const Profilepage = false;
  const user = useSelector((state) => state.authRedecer.authData);
  const posts = useSelector((state) => state.postReducer);
  console.log("user = = = =", user);
  // console.log("posts ", posts);
  // console.log("profileCard", posts.posts.data);
  return (
    <div className="ProfileCard">
      <div className="ProfileImg">
        {location === "homepage" ? (
          <>
            <div className="wrappermain">
              <div className="wrapper1">
                <img
                  className="wrapperBox1"
                  src={
                    user.data.profilePicture
                      ? `http://localhost:8000/images/${user.data.profilePicture}`
                      : "http://localhost:8000/images/defaultCover.png"
                  }
                  alt=""
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* <img
              src={
                user.data.coverPicture
                  ? `http://localhost:8000/images/${user.data.coverPicture}`
                  : "http://localhost:8000/images/defaultCover1.jpg"
              }
              alt=""
            /> */}
            <div className="wrapper">
              <img
                className="wrapperBox"
                src={
                  user.data.profilePicture
                    ? `http://localhost:8000/images/${user.data.profilePicture}`
                    : "http://localhost:8000/images/defaultCover.png"
                }
                alt=""
              />
            </div>
          </>
        )}
      </div>
      <div className="ProfileName">
        <span>
          {user.data?.firstname}
          {"  "}
          {user.data?.lastname}
        </span>
        <span>
          {user.data?.about ? user.data?.about : "write about yourself"}
        </span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>
              {user.data?.followings ? user.data?.followings.length : "0"}
            </span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>
              {user.data?.followers ? user.data?.followers.length : "0"}
            </span>
            <span>Followers</span>
          </div>
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {
                    posts.posts.data.filter(
                      (post) => post.userId === user.data._id
                    ).length
                  }
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
        <span style={{ textAlign: "center", marginBottom: "20px" }}>
          <Link
            style={{ textDecoration: "none" }}
            to={`/profile/${user.data?._id}`}
          >
            MyProfile
          </Link>
        </span>
      )}
    </div>
  );
}

export default ProfileCard;
