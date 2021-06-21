import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { auth } from "firebase/AppFirebase";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function UserAuthentication() {
  const [signin, setSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const toggleSignIn = (toggle) => {
    setSignIn(toggle);
    setPassword("");
    setUsername("");
    setEmail("");
  };

  const signIn = (e) => {
    setLoader(true);
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error.message);
        setOpen(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const signUp = (e) => {
    setLoader(true);
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username.charAt(0).toUpperCase() + username.slice(1),
        });
      })
      .then(()=>{
        window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
        setOpen(true);
      })
      .finally(() => {
        setLoader(false);
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
        <img src="https://avatars.githubusercontent.com/u/5553065?s=200&v=4" alt="brand_image" width="120px"></img>
      </div>
      <div className="form_div">
        <div className="form_tab">
          <button
            className={`login_button ${signin ? "active" : "inactive"}`}
            onClick={()=>toggleSignIn(true)}>
            Login
          </button>
          <button
            className={`signup_button ${signin ? "inactive" : "active"}`}
            onClick={()=>toggleSignIn(false)}>
            Sign Up
          </button>
        </div>
        <div className="form">
          {signin ? (
            <form className="app_signup">
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}></input>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}></input>
              <button onClick={signIn}>{loader ? "Signing In ..." : "Sign In"}</button>
            </form>
          ) : (
            <form className="app_signup">
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}></input>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}></input>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}></input>
              <button onClick={signUp}>{loader ? "Signing Up ..." : "Sign Up"}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserAuthentication;
