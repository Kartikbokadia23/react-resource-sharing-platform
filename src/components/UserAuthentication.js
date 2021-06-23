import React, { useState, useEffect, useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

import { AuthContext } from "components/UserContext";
import { auth, provider } from "firebase/AppFirebase";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function UserAuthentication() {
  const currentUser = useContext(AuthContext);
  const history = useHistory();

  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      history.push("/home");
    }
  });
  const signIn = (e) => {
    e.preventDefault();
    provider.setCustomParameters({
      hd: "gkmit.co",
    });
    auth
      .signInWithPopup(provider)
      .catch((error) => {
        setError(error.message);
        setOpen(true);
      });
  };

  return (
    <div className="main_form">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}>
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity="error">
          {error}
        </Alert>
      </Snackbar>
      <div className="brand_div">
        <img
          src="https://avatars.githubusercontent.com/u/5553065?s=200&v=4"
          alt="brand_image"
          width="120px"></img>
      </div>
      <div className="form_div">
        <div className="form">
          <form className="app_signup">
            <button className="google_login" onClick={signIn}>
              {" "}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="logo"
              />
              Login With Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserAuthentication;
