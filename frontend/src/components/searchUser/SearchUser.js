import React, { useEffect } from "react";
import PostSide from "../postside/PostSide";
import ProfileCard from "../profilecard/ProfileCard";
import ProfileLeft from "../profileLeft/ProfileLeft";
import RightSide from "../rightside/RightSide";

const SearchUser = (usersearch) => {
  console.log("usersearch = >", usersearch);
  useEffect(() => {}, []);
  return (
    <div>
      <div className="Profile">
        {usersearch.usersearch == "searchuser" ? (
          <>
            <div>
              <ProfileLeft usersearch={"searchuser"} />
            </div>
          </>
        ) : (
          <>
            {/* <ProfileLeft /> */}
          </>
        )}

        <div className="Profile-center">
          <ProfileCard usersearch={"searchuser"} />
        </div>

        <RightSide />
      </div>
    </div>
  );
};

export default SearchUser;
