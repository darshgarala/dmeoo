import React from "react";
import ProfileSide from "../profileside/ProfileSide";
import SettingMenu from "./SettingMenu";
import RightSide from "../rightside/RightSide";
import "./EditProfileSetting.css";
const AccountSetting = () => {
  return (
    <>
      <div className="Home">
        <ProfileSide location="setting"></ProfileSide>
        <div className="Account">
          <h1>AccountSetting</h1>
        </div>
        <RightSide />
      </div>
    </>
  );
};

export default AccountSetting;
