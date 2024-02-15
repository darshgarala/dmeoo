import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { Followres } from "../../data/followersData";
import { useSelector } from "react-redux";
import User from "../user/User";
import { StrictMode } from "react";
import { getAllUserForFollowAndUnfollow } from "../../api/UserRequest.js";
function FollowersCard(location) {
  const [allperson, setPerson] = useState([]);
  const user = useSelector((state) => state.authRedecer.authData);
  // console.log("object", user);
  useEffect(() => {
    const fetchPerson = async () => {
      const { data } = await getAllUserForFollowAndUnfollow();
      // console.log("fetch user", data.data);
      setPerson(data.data);
    };
    fetchPerson();
  }, []);
  return (
    <div className="FollowersCard">
      {location.location.location == "profilePage" ? (
        <>
          <h3>Who is Following You</h3>
          {allperson.map((person, id) => {
            if (person._id !== user.data._id) {
              return <User person={person} userId={user.data._id} key={id} />;
            }
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default FollowersCard;
