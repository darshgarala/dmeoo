import React from "react";
import "./ProfileSide.css";
import LogoSearch from "../logosearch/LogoSearch";
import ProfileCard from "../profilecard/ProfileCard";
import FollowersCard from "../followerscard/FollowersCard";
// ---------------------
function ProfileSide(location) {
  return (
    <div className="ProfileSide">
      <LogoSearch  />
      <ProfileCard location="homepage" />
      <FollowersCard location={location} />
    </div>
  );
}

export default ProfileSide;
