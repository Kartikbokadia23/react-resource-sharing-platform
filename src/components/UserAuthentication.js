import React, { useState, useEffect, useContext } from "react";
import { auth, db } from "firebase/AppFirebase";

function UserAuthentication() {
  const [signin, setSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");


  const toggleSignIn = (e) => {
    e.preventDefault();
    setSignIn(true);
  };

  const toggleSignUp = (e) => {
    e.preventDefault();
    setSignIn(false);
  };

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
  };

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="main_form">
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
              <button onClick={signIn}>Sign In</button>
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
              <button onClick={signUp}>Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserAuthentication;
