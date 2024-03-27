import React from "react";
import ProfileSide from "../profileside/ProfileSide";
import SettingMenu from "./SettingMenu";
import RightSide from "../rightside/RightSide";
import "./EditProfileSetting.css";
const LogoutSetting = () => {
  return (
    <>
      <div className="Home">
        <ProfileSide location="setting"></ProfileSide>
        <div className="Logout">
          <h1>Logout</h1>
        </div>
        <RightSide />
      </div>
    </>
  );
};

export default LogoutSetting;
