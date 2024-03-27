import React, { useEffect, useState } from "react";
import cover from "../../img/cover.png";
import profileImg from "../../img/profileImg.png";
import "./ProfileCard.css";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../api/UserRequest";
// import ProfileCard from
function ProfileCard({ location, usersearch }) {
  const user = useSelector((state) => state.authRedecer.authData);
  const posts = useSelector((state) => state.postReducer);
  const params = useParams();
  const [userstate, setUserstate] = useState(user);
  console.log("user = ", user);

  useEffect(() => {
    const fun = async () => {
      if (params.id) {
        const user1 = await getUser(params.id);
        setUserstate(user1.data);
      }
    };
    fun();
  }, []);

  return (
    <>
      <div className="ProfileCard">
        <div className="ProfileImg">
          {location === "homepage" ? (
            <>
              <div className="wrappermain">
                <div className="wrapper1">
                  <img
                    className="wrapperBox1"
                    src={
                      userstate.data.profilePicture
                        ? `https://social-media-webapplication-1.onrender.com/images/${userstate.data.profilePicture}`
                        : "https://social-media-webapplication-1.onrender.com/images/defaultCover.png"
                    }
                    alt=""
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="wrapper">
                <img
                  className="wrapperBox"
                  src={
                    userstate.data.profilePicture
                      ? `https://social-media-webapplication-1.onrender.com/images/${userstate.data.profilePicture}`
                      : "https://social-media-webapplication-1.onrender.com/images/defaultCover.png"
                  }
                  alt=""
                />
              </div>
            </>
          )}
        </div>
        <div className="ProfileName">
          <span>
            {userstate.data?.firstname}
            {"  "}
            {userstate.data?.lastname}
          </span>
          <span>
            {userstate.data?.about
              ? userstate.data?.about
              : "write about yourself"}
          </span>
        </div>
        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>
                {userstate.data?.followings
                  ? userstate.data?.followings.length
                  : "0"}
              </span>
              <span>Following</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>
                {userstate.data?.followers
                  ? userstate.data?.followers.length
                  : "0"}
              </span>
              <span>Followers</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>
                {
                  posts.posts?.data?.filter(
                    (post) => post.userId === userstate.data._id
                  ).length
                }
              </span>
              <span>Posts</span>
            </div>
          </div>
          <hr />
        </div>
        {location === "profilePage" || usersearch === "searchuser" ? (
          ""
        ) : (
          <span style={{ textAlign: "center", marginBottom: "20px" }}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/profile/${userstate.data?._id}`}
            >
              MyProfile
            </Link>
          </span>
        )}
      </div>
    </>
  );
}

export default ProfileCard;
