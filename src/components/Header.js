import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import svg from "assets/undraw_Add_files_re_v09g.svg";
import { auth } from "firebase/AppFirebase";
import { AuthContext } from "components/UserContext";

function Header() {
  const currentUser = useContext(AuthContext);

  return (
    <div className="header">
      <div className="user_wrapper">
        <div className="brand">
          <img src="https://avatars.githubusercontent.com/u/5553065?s=200" alt="brand_image" width="50px"></img>
        </div>
        <div className="header_user">
          <h2>Welcome {currentUser.displayName} !</h2>
          <img src={svg} alt="post_image"></img>
        </div>
      </div>
      <div className="header_action">
        <Avatar
          alt={currentUser.displayName}
          src="/static/images/avatar/1.jpg"
          className="user_avatar"
        />
        <ExitToAppIcon className="logout_button" onClick={() => auth.signOut()} />
      </div>
    </div>
  );
}

export default Header;
