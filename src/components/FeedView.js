import React, { useEffect, useState } from "react";
import { db } from "firebase/AppFirebase";
import { useHistory } from "react-router-dom";

import Post from "components/Post";

function FeedView() {
  const history = useHistory();
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    db.collection("feeds")
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (snapshot) => {
          setFeeds(
            snapshot.docs.map((doc) => ({
              feed: doc.data(),
              id: doc.id,
            }))
          );
        },
        (error) => {
          console.log(error, window.location.href);
          if (!window.location.href.includes("/userAuth")) {
            history.push("/unauthorized");
          }
        }
      );
  }, []);

  return (
    <div className="post_container">
      {feeds.map(({ feed, id }) => (
        <Post
          key={id}
          message={feed.user_message}
          title={feed.url_title}
          description={feed.url_description}
          image={feed.url_image}
          type={feed.url_content_type}
          userName={feed.user_name}
        />
      ))}
    </div>
  );
}

export default FeedView;
