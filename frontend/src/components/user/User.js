import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UnfollowUser, followUser } from "../../actions/UserAction";
import { useSelector } from "react-redux";

const User = ({ person, userId }) => {
  const dispatch = useDispatch();
  //   const user = useSelector((state) => state.authRedecer.authData);
  //   console.log("person", person);
  //   console.log(user.data);

  //   console.log(userId);
  // console.log("fjng");
  const followingData = person?.followers;
  //   const followingData = person?.followings;
  // console.log(person, followingData);
  // console.log(user.data._id);
  //   const check = followingData.includes(userId);

  const [following, setFollowing] = useState(followingData.includes(userId));
  // console.log(check);
  // if (check) {
  //     setFollowing(true);
  // }
  const handleFollow = () => {
    // console.log("===>", user.data);
    following
      ? dispatch(UnfollowUser(person._id, userId))
      : dispatch(followUser(person._id, userId));

    setFollowing((e) => !e);
  };
  return (
    <>
      <div className="follower">
        <div>
          <img
            className="followersimg"
            src={
              person.profilePicture
                ? `http://localhost:8000/images/${person.profilePicture}`
                : "http://localhost:8000/images/defaultCover.png"
            }
            alt=""
          />

          <div>
            <span>
              {person.firstname} {person.lastname}
            </span>
            <br />
            <span>@{person.username}</span>
          </div>
        </div>
        <button className="button fc-button" onClick={handleFollow}>
          {following ? "Unfollow" : "Follow"}
        </button>
      </div>
    </>
  );
};

export default User;
