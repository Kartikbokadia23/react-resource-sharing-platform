import React, { useState } from "react";
import Post from "./PostComponent";
import { BsBoxArrowUp } from "react-icons/bs";

function Upload() {
  const [posts, setPosts] = useState([]);
  const [feed, setFeed] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    setPosts((prevValue) => [...prevValue, { feed: feed }]);
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
        <button onClick={handleUpload}>
          <BsBoxArrowUp className="upload_button" />
        </button>
      </div>
      <div className="post_container">
        {posts.map((post) => (
          <Post feed={post.feed} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default Upload;
