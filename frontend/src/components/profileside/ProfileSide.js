import React, { useEffect, useState } from "react";
import "./ProfileSide.css";
import LogoSearch from "../logosearch/LogoSearch";
import ProfileCard from "../profilecard/ProfileCard";
import FollowersCard from "../followerscard/FollowersCard";
// ---------------------
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ProfileSide({ location }) {
  const [id1, setId1] = useState(null);
  const user = useSelector((state) => state.authRedecer.authData);
  useEffect(() => {
    setId1(user.data._id);
  });
  console.log("object ", user.data._id);
  return (
    <div className="ProfileSide">
      {location === "setting" ? (
        <>
          <LogoSearch />
          <div className="settingMenu">
            <div className="links">
              {/* <li> */}
              <div className="link">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/EditProfile/` + id1}
                >
                  Edit Profile
                </Link>
              </div>
              <div className="link">
                <Link style={{ textDecoration: "none" }} to={`/Account`}>
                  Account Privacy
                </Link>
              </div>
              <div className="link">
                <Link style={{ textDecoration: "none" }} to={`/Reset`}>
                  Reset Password
                </Link>
              </div>
              <div className="link">
                <Link style={{ textDecoration: "none" }} to={`/Home`}>
                  Close Friend
                </Link>
              </div>
              <div className="link">
                <Link style={{ textDecoration: "none" }} to={`/Home`}>
                  Personal Details
                </Link>
              </div>
              <div className="link">
                <Link style={{ textDecoration: "none" }} to={`/Logout`}>
                  Logout
                </Link>
              </div>
              {/* <div className="link">
                <Link style={{ textDecoration: "none" }} to={`/Home`}>
                  MyProfile
                </Link>
              </div> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <LogoSearch />
          <ProfileCard location="homepage" />
          <FollowersCard location={location} />
        </>
      )}
    </div>
  );
}

export default ProfileSide;
