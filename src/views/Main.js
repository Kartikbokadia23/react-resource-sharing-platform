import React from "react";

import Header from "components/Header";
import Sidebar from "components/SideBar";
import FeedUpload from "components/FeedUpload";
import FeedView from "components/FeedView";

function Main() {
  return (
    <React.Fragment>
      <Header />
      <Sidebar />
      <div className="main">
        <FeedUpload />
        <FeedView />
      </div>
    </React.Fragment>
  );
}

export default Main;
