import React, { useState } from "react";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { BiCameraMovie } from "react-icons/bi/";
import { MdLibraryBooks } from "react-icons/md";
import { FiGlobe } from "react-icons/fi";
import { ImFilePicture } from "react-icons/im";
import { BiMessageRounded } from "react-icons/bi";

function SideBar() {
  const [sidebarexpanded, setSidebarExpanded] = useState(true);

  const handleToggle = () => {
    setSidebarExpanded(!sidebarexpanded);
  };

  return (
    <div className={`sidebar ${sidebarexpanded ? "show" : "hide"}`}>
      <div className="sidebar_main">
        <div className="toggle" onClick={handleToggle}>
          {sidebarexpanded ? <ArrowForwardIosRoundedIcon /> : <ArrowBackIosRoundedIcon />}
        </div>
        <ul className="sidebar_items">
          <li className="sidebar_item">
            <a href="">
              <BiMessageRounded className="category_icon" color="black" />
            </a>
            <span>Something on Mind..</span>
          </li>
          <li className="sidebar_item">
            <a href="">
              <BiCameraMovie className="category_icon" color="black" />
            </a>
            <span>Movies</span>
          </li>
          <li className="sidebar_item">
            <a href="">
              <MdLibraryBooks className="category_icon" color="black" />
            </a>
            <span>Books</span>
          </li>
          <li className="sidebar_item">
            <a href="">
              <FiGlobe className="category_icon" color="black" />
            </a>
            <span>Resource URL</span>
          </li>
          <li className="sidebar_item">
            <a href="">
              <ImFilePicture className="category_icon" color="black" />
            </a>
            <span>Picture</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
