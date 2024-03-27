import React from "react";
import ProfileSide from "../../components/profileside/ProfileSide";
import PostSide from "../../components/postside/PostSide";
import RightSide from "../../components/rightside/RightSide";
import SettingMenu from "../../components/settingMenu/SettingMenu";

const Setting = () => {
  return (
    <div className="Home">
      <ProfileSide location="setting"></ProfileSide>
      <SettingMenu></SettingMenu>
      <RightSide />
    </div>
  );
};

export default Setting;
