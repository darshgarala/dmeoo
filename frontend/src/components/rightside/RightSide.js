import React from "react";
import "./RightSide.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faGear,
  faBell,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import TrendCard from "../trendcard/TrendCard";
import { Link } from "react-router-dom";
function RightSide() {
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <FontAwesomeIcon
            icon={faHouse}
            style={{ gap: "0px", fontSize: "25px" }}
          />
        </Link>
        <FontAwesomeIcon
          icon={faGear}
          style={{ gap: "0px", fontSize: "25px" }}
        />
        <FontAwesomeIcon
          icon={faBell}
          style={{ gap: "0px", fontSize: "25px" }}
        />
        <FontAwesomeIcon
          icon={faMessage}
          style={{ gap: "0px", fontSize: "25px" }}
        />
      </div>
      <TrendCard />
      <button className="button r-button">Share</button>
    </div>
  );
}

export default RightSide;
