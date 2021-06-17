import React from "react";
import Header from "components/Header";
import Sidebar from "components/SideBar";
import Upload from "components/FeedUpload";

function Main() {
  return (
    <React.Fragment>
      <Header />
      <Sidebar />
      <div className="main">
        <Upload />
      </div>
    </React.Fragment>
  );
}

export default Main;
