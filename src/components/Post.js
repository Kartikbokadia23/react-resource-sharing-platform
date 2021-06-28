import React from "react";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";

function Post({ message, title, description, type, image, userName }) {
  return (
    <div className="post_card">
      <div className="post_heading">
        <Avatar alt={userName} src="/static/images/avatar/1.jpg" className="user_post_avatar" />
        <h4>
          {`${userName} ${type == "Movie" || type == "TV Series" ? "recommended" : "shared"} a ${type}`}
        </h4>
      </div>

      <div className="user_message">
        <h4>{message}</h4>
      </div>

      <div className="post_image">
        <img src={image}></img>
      </div>

      <div className="post_description">
        <h3>{title}</h3>

      </div>
    </div>
  );
}

// Post.propTypes = {
//   feed: PropTypes.string,
// };

export default Post;
