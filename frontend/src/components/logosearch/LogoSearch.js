import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIcons,
  faMagnifyingGlassArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./LogoSearch.css";
import { getAllUser } from "../../api/UserRequest";
import { Link } from "react-router-dom";

function LogoSearch() {
  const [search, setSearch] = useState("");
  const serachModel = useRef(null);
  const [list, setList] = useState([]);
  useEffect(() => {}, []);

  const searchUseFront = async (query) => {
    setSearch(query);
    if (query !== "") {
      const data = await getAllUser(query);
      console.log("getAllUser => ", data.data.data);
      setList(data.data.data);
    } else {
      setList([]);
    }
  };

  return (
    <div className="LogoSearch">
      <div className="logoSearch_1">
        <div>
          <FontAwesomeIcon
            icon={faIcons}
            style={{ color: "#f5c30c", fontSize: "30px", marginTop: "20px" }}
          />
        </div>
        <div className="Search">
          {/* <input type="text" placeholder="#Explore" /> */}
          <div className="autocomplete-search-box" ref={serachModel}>
            <input
              type="text"
              className="search-box"
              placeholder="#Explore"
              value={search}
              onChange={(e) => searchUseFront(e.target.value)}
            />
            <ul className="search-result">
              {list.map((Ldata, key) => {
                return (
                  <>
                    <Link>
                      <li >{Ldata.username}</li>
                    </Link>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="s-icon">
          <FontAwesomeIcon
            icon={faMagnifyingGlassArrowRight}
            style={{
              color: "#e1ae4a",
              fontSize: "25px",
              marginTop: "2px",
              marginLeft: "-8px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LogoSearch;
