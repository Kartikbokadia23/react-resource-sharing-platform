import "./App.css";
import React , {useContext} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';

import Main from "components/Main";
import {AuthContext} from "components/UserContext";
import UserAuthentication from 'components/UserAuthentication';

function App() {
  
  const currentUser = useContext(AuthContext)
  return (
    <Switch>
      <Route path='/userAuth' render={() => ( !currentUser ? <UserAuthentication /> : <Redirect to='/home' /> )}/>
      <Route path='/home' render={() => ( currentUser ? <Main /> : <Redirect to='/userAuth' /> )}/>
      <Redirect to="/userAuth" />
    </Switch>
  );
}

export default withRouter(App);
