import React, { useEffect, useState } from "react";
import "./Posts.css";
import { PostsData } from "../../data/postData.js";
import Post from "../post/Post.js";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePost } from "../../actions/PostAction.js";
import { getAllPost } from "../../api/PostRequest.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
function Posts({ location }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authRedecer.authData);
  const { posts, loading } = useSelector((state) => state.postReducer);
  const [getAllpost, setgetAllpost] = useState([]);

  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    async function getData() {
      dispatch(getTimelinePost(user.data._id));
      const data = await getAllPost();
      // console.log("getAllPost = > data ", data.data.data);
      setgetAllpost(data.data.data);
      // console.log("fsF",data);
      const data1 = data?.data?.data?.filter((data) => {
        // console.log("asdfa", data);
        return  data.userId === user.data._id;
      });
      // console.log("fafgar",data1);
      setCurrentUser([...currentUser, ...data1])
    }
    getData();
    // console.log("getAllPost = > ", getAllPost);
  }, []);

  // console.log("location = ", getAllPost);

  return (
    <div className="Posts">
      {loading ? (
        <>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h1>Feching Data...........</h1>
            <FontAwesomeIcon
              icon={faSpinner}
              spinPulse
              style={{ fontSize: "60px" }}
            />
          </div>
        </>
      ) : location === "profilepage" ? (
        currentUser?.map((post, id) => {
          return <Post data={post} edit={"yes"} key={id} />;
        })
      ) : (
        getAllpost?.map((post, id) => {
          return <Post data={post} edit={"no"} key={id} />;
        })
      )}
    </div>
  );
}

export default Posts;
