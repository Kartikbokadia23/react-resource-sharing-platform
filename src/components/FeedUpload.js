import React, { useContext, useEffect, useReducer } from "react";
import { BsBoxArrowUp } from "react-icons/bs";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

import { isValidUrl, previewUrl } from "utility/Utils.js";
import { AuthContext } from "components/UserContext";
import { db } from "firebase/AppFirebase";

const initialState = {
  title: "",
  description: "",
  image: "",
  type: "",
  message: "",
  domain: "",
  favicon: "",
  url: ""
};

function reducer(state, action) {
  switch(action.type){
    case "UPDATE_STATE":{
      return{...state, [action.stateName]: action.payload}
    }

    case "INITIAL_STATE":{
      return{...state, title:"", image:"", description:"", type:"", domain:"",favicon:""}
    }
    default:
      return state
  }
}



function FeedUpload() {
  const history = useHistory();
  const currentUser = useContext(AuthContext);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { title, description, image, type, message, domain, favicon, url } = state;

  useEffect(() => {
    dispatch({type:"INITIAL_STATE"})
    if (isValidUrl(url)) {
      console.log("valid");
      previewUrl(url).then(({ title, description, image, type, domain, favicon }) => {
        title && dispatch({type:"UPDATE_STATE", stateName: "title", payload:title});
        description && dispatch({type:"UPDATE_STATE", stateName: "description", payload:description});
        image && dispatch({type:"UPDATE_STATE", stateName: "image", payload:image});
        type && dispatch({type:"UPDATE_STATE", stateName: "type", payload:type})
        domain && dispatch({type:"UPDATE_STATE", stateName: "domain", payload:domain})
        favicon && dispatch({type:"UPDATE_STATE", stateName: "favicon", payload:favicon})
      });
    } else {
      return;
    }
  }, [url]);

  const handleUpload = (e) => {
    db.collection("feeds")
    .add({
      url_content_type: type,
      url_domain: domain,
      url_logo: favicon,
      url_description: description,
      url_image: image,
      url_title: title,
      user_message: message,
      user_name: currentUser.displayName,
      user_id: currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch((error) => {
      if (!window.location.href.includes('/userAuth')) {
        history.push("/unauthorized");
      }
    });
    dispatch({type:"UPDATE_STATE",stateName: "message", payload:""})
    dispatch({type:"UPDATE_STATE",stateName: "url", payload:""})

  };

  return (
    <React.Fragment>
      <div className="post_upload">
        <div className="user_input">
          <textarea
            value={url}
            rows="3"
            placeholder="Paste the resource url"
            onChange={(event) => dispatch({type:"UPDATE_STATE",stateName: "url", payload:event.target.value})}></textarea>
            <br/>
          <textarea
            value={message}
            rows="3"
            placeholder="Something on mind ..."
            onChange={(event) => dispatch({type:"UPDATE_STATE",stateName: "message", payload:event.target.value})}></textarea>
        </div>
        <button onClick={handleUpload} disabled={url.trim().length < 1}>
          <BsBoxArrowUp className="upload_button" />
        </button>
      </div>
      <div className={`url_preview_container ${title ? "show" : "hide"}`}>
        {title ? (
          <div className="url_preview">
            <div className="url_image">
              <img src={image}></img>
            </div>
            <div className="url_description">
              <span><img src={favicon} height="32" width="32"></img>&nbsp;{domain}</span>
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default FeedUpload;
