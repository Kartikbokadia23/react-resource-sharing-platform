import "./App.css";
import React , {useContext} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';

import Main from "components/Main";
import {AuthContext} from "components/UserContext";
import UserAuthentication from 'components/UserAuthentication';
import UnAuthorized from "components/UnAuthorized";

function App() {
  
  const currentUser = useContext(AuthContext)
  return (
    <Switch>
      <Route path="/userAuth" component={UserAuthentication} />
      <Route path="/home" component={Main} />
      <Route path="/unauthorized" component={UnAuthorized} />
      <Redirect to="/userAuth" />
    </Switch>
  );
}

export default withRouter(App);
