import React from "react";
import "./Home.css";
import ProfileSide from "../../components/profileside/ProfileSide.js";
import PostSide from "../../components/postside/PostSide.js";
import RightSide from "../../components/rightside/RightSide.js";
function Home() {
  return (
    <div className="Home">
      <ProfileSide location={"home"}></ProfileSide>
      <PostSide location={"home"}></PostSide>
      <RightSide />
    </div>
  );
}

export default Home;
