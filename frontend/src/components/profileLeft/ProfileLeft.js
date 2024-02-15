import React from "react";
import "./ProfileLeft.css";
import LogoSearch from "../logosearch/LogoSearch";
import FollowersCard from "../followerscard/FollowersCard";
import InfoCard from "../infocard/InfoCard";
function ProfileLeft(location) {
  return (
    <div>
      <LogoSearch location={location} />
      <InfoCard location={location} />
      <FollowersCard location={location} />
    </div>
  );
}

export default ProfileLeft;
