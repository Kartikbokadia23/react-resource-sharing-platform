import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import svg from "../assets/undraw_Add_files_re_v09g.svg";

const Header = () => {
  return (
    <div className="header">
      <div className="user_wrapper">
        <div className="brand">
          <img
            src="https://avatars.githubusercontent.com/u/5553065?s=200&v=4"
            width="50px"
          ></img>
        </div>
        <div className="header_user">
          <h2>Welcome, Kartik !</h2>
          <img src={svg}></img>
        </div>
      </div>
      <div className="header_action">
        <Avatar
          alt="Kartik Bokadia"
          src="/static/images/avatar/1.jpg"
          className="user_avatar"
        />
        <ExitToAppIcon className="logout_button" />
      </div>
    </div>
  );
};

export default Header;
