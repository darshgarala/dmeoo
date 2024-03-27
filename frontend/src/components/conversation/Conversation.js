import React, { useEffect, useState } from "react";
import { getUser } from "../../api/UserRequest";

const Conversation = ({ data, currentUserId }) => {
  const [userData, setUserData] = useState(null);
  //   console.log("data", data);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const data = await getUser(userId);
        setUserData(data.data.data);
        console.log("userId = ", data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div>
          <div className="online-dot"></div>
          <img
            src={
              userData?.profilePicture
                ? `https://social-media-webapplication-1.onrender.com/images/${userData.profilePicture}`
                : "https://social-media-webapplication-1.onrender.com/images/defaultCover.png"
            }
            alt=""
          />
        </div>
      </div>

      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
