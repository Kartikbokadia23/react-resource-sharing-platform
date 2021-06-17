import "./App.css";
import Main from "components/Main";
import React , {useContext} from 'react'
import UserAuthentication from 'components/UserAuthentication';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {AuthContext} from "components/UserContext";

function App() {
  const currentUser = useContext(AuthContext)
  return (
    <Switch>
      <Route path='/userAuth' render={() => ( !currentUser ? <UserAuthentication /> : <Redirect to='/home' /> )}/>
      <Route path='/home' render={() => ( currentUser ? <Main /> : <Redirect to='/userAuth' /> )}/>
      <Route path='/home' component={Main} />
      <Route path='/userAuth' component={UserAuthentication} />
    </Switch>
  );
}

export default withRouter(App);
