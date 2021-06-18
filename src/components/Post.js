import React from "react";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types"

function Post({ feed }) {
  return (
    <div className="post_card">
      <Avatar
        alt="Kartik Bokadia"
        src="/static/images/avatar/1.jpg"
        className="user_post_avatar"
      />
      <h3>{feed}</h3>
    </div>
  );
}

Post.propTypes={
  feed: PropTypes.string
}

export default Post;
