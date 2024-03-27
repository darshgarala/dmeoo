import React from "react";
import ProfileSide from "../profileside/ProfileSide";
import SettingMenu from "./SettingMenu";
import RightSide from "../rightside/RightSide";
import "./EditProfileSetting.css";
const ResetPassSetting = () => {
  return (
    <>
      <div className="Home">
        <ProfileSide location="setting"></ProfileSide>
        <div className="ResetPass">
          <h1>reset</h1>
        </div>
        <RightSide />
      </div>
    </>
  );
};

export default ResetPassSetting;
