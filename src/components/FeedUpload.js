import React, { useState, useContext, useEffect } from "react";
import { BsBoxArrowUp } from "react-icons/bs";
import firebase from "firebase";

import { AuthContext } from "components/UserContext";
import Post from "components/Post";
import { db } from "firebase/AppFirebase";

function FeedUpload() {
  const currentUser = useContext(AuthContext);
  const [feeds, setFeeds] = useState([]);
  const [feed, setFeed] = useState("");

  useEffect(() => {
    db.collection("feeds")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setFeeds(
          snapshot.docs.map((doc) => ({
            feed: doc.data(),
            id: doc.id,
          }))
        );
      });
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();

    db.collection("feeds").add({
      feed: feed,
      user_name: currentUser.displayName,
      user_id: currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setFeed("");
  };

  return (
    <React.Fragment>
      <div className="post_upload">
        <textarea
          value={feed}
          rows="7"
          placeholder="Something on mind ..."
          onChange={(event) => setFeed(event.target.value)}></textarea>
        <button onClick={handleUpload} disabled={feed.trim().length < 1}>
          <BsBoxArrowUp className="upload_button" />
        </button>
      </div>
      <div className="post_container">
        {feeds.map(({ feed, id }) => (
          <Post key={id} feed={feed.feed} userName={feed.user_name} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default FeedUpload;
