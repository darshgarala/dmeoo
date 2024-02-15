import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ProfileModel from "../profilemodel/ProfileModel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";
import { logOut } from "../../actions/AuthAction";
function InfoCard() {
  const [modelOpen, setModelopen] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});

  const user = useSelector((state) => state.authRedecer.authData);
  // console.log("info", user);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
        // console.log("user for useEffect in infocard => ", user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser.data.data);
        // console.log("=> profileUser", profileUser.data.data);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {/* <FontAwesomeIcon
          style={{ cursor: "pointer", color: "var(--gray)", fontSize: "20px" }}
          icon={faPenToSquare}
          onClick={() => setModelopen(true)}
        /> */}
        <ProfileModel data={user} />
      </div>
      <div className="info">
        <span>
          <b>username</b>
        </span>{" "}
        <span>{profileUser.username}</span>
      </div>
      <div className="info">
        <span>
          <b>firstname</b>
        </span>{" "}
        <span>{profileUser.firstname}</span>
      </div>
      <div className="info">
        <span>
          <b>lastname</b>
        </span>{" "}
        <span>{profileUser.lastname}</span>
      </div>
      <div className="info">
        <span>
          <b>about</b>
        </span>{" "}
        <span>{profileUser.about}</span>
      </div>
      <div className="info">
        <span>
          <b>status</b>
        </span>{" "}
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in</b>
        </span>{" "}
        <span>{profileUser.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at</b>
        </span>{" "}
        <span>{profileUser.worksAt}</span>
      </div>
      <div className="info">
        <span>
          <b>country</b>
        </span>{" "}
        <span>{profileUser.country}</span>
      </div>
      <button className="button logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default InfoCard;
