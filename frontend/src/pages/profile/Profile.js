import React from "react";
import "./Profile.css";
import ProfileLeft from "../../components/profileLeft/ProfileLeft";
import ProfileCard from "../../components/profilecard/ProfileCard";
import PostSide from "../../components/postside/PostSide.js";
import RightSide from "../../components/rightside/RightSide.js";
function Profile(location) {
  return (
    <div>
      <div className="Profile">
        <ProfileLeft location={"profilePage"} />

        <div className="Profile-center">
          <ProfileCard location={"profilePage"} />
          <PostSide location={"profilepage"} />
        </div>

        <RightSide />
      </div>
    </div>
  );
}

export default Profile;
