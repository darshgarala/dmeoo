import React from "react";
import "./PostSide.css";
import PostShare from "../postshare/PostShare.js";
import Posts from "../posts/Posts.js";
import Story from "../story/Story.js";
function PostSide({ location }) {
  return (
    <div className="PostSide">
      {location === "home" ? (
        ""
      ) : (
        <>
          <PostShare />
        </>
      )}
      <Story location={location}></Story>
      <div className="PostSide">
        <Posts location={location} />
      </div>
    </div>
  );
}

export default PostSide;
