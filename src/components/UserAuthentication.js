import React, { useState } from "react";
import { auth } from "firebase/AppFirebase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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

  const toggleSignIn = (e) => {
    e.preventDefault();
    setSignIn(true);
    setPassword('')
    setUsername('')
    setEmail('')
  };

  const toggleSignUp = (e) => {
    e.preventDefault();
    setSignIn(false);
    setPassword('')
    setUsername('')
    setEmail('')
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
          displayName: username,
        });
      })
      .catch((error) => {
        setError(error.message);
        setOpen(true);
      })
      .finally(() => {
          window.location.reload();
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
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity="error"
        >
          {error}
        </Alert>
      </Snackbar>
      <div className="brand_div">
        <img
          src="https://avatars.githubusercontent.com/u/5553065?s=200&v=4"
          width="120px"
        ></img>
      </div>
      <div className="form_div">
        <div className="form_tab">
          <button
            className={`login_button ${signin ? "active" : "inactive"}`}
            onClick={toggleSignIn}
          >
            Login
          </button>
          <button
            className={`signup_button ${signin ? "inactive" : "active"}`}
            onClick={toggleSignUp}
          >
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
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <button onClick={signIn}>
                {loader ? "Signing In ..." : "Sign In"}
              </button>
            </form>
          ) : (
            <form className="app_signup">
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <button onClick={signUp}>
                {loader ? "Signing Up ..." : "Sign Up"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserAuthentication;
