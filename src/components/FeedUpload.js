import React, { useState } from "react";
import Post from "components/Post";
import { BsBoxArrowUp } from "react-icons/bs";

function Upload() {
  const [feeds, setFeeds] = useState([]);
  const [feed, setFeed] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();

    setFeeds((prevValue) => [...prevValue, { feed: feed }]);
    setFeed("");
  };

  return (
    <React.Fragment>
      <div className="post_upload">
        <textarea
          value={feed}
          rows="7"
          placeholder="Something on mind ..."
          onChange={(event) => setFeed(event.target.value)}
        ></textarea>
        <button onClick={handleUpload} disabled={feed.trim().length<1}>
          <BsBoxArrowUp className="upload_button" />
        </button>
      </div>
      <div className="post_container">
        {feeds.map((item) => (
          <Post feed={item.feed} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default Upload;
