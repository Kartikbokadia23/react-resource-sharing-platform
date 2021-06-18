import "./App.css";
import Main from "components/Main";
import React , {useContext} from 'react'
import UserAuthentication from 'components/UserAuthentication';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {AuthContext} from "components/UserContext";

function App() {
  const currentUser = useContext(AuthContext)
  console.log(currentUser,"app")
  return (
    <Switch>
      <Route path='/userAuth' render={() => ( !currentUser ? <UserAuthentication /> : <Redirect to='/home' /> )}/>
      <Route path='/home' render={() => ( currentUser ? <Main /> : <Redirect to='/userAuth' /> )}/>
      <Redirect to="/userAuth" />
    </Switch>
  );
}

export default withRouter(App);
