import React from "react";
import "./TrendCard.css";
import { TrendData } from "../../data/trendcard.js";

function TrendCard() {
  return (
    <div className="TrendCard">
      <h3>Trends For You</h3>
      {TrendData.map((data, id) => {
        return (
          <div className="trend" key={id}>
            <span>#{data.name}</span>
            <span>{data.shares}K shares</span>
          </div>
        );
      })}
    </div>
  );
}

export default TrendCard;
