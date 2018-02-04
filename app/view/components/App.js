/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Map from './home/Map';
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import Index from "./index/Index";
import Profile from "./profile/Profile";

const App = () => (
  <Switch>
    <Route exact path="/" component={Index} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/profile" render={props => (<Profile
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB8TVrna1xySPsYSqwlK_Ek0rG25uzYWI0"
      loadingElement={<div id={"loadingElement"} />}
      containerElement={<div id={"containerElement"} />}
      mapElement={<div id={"mapElement"} />}
      {...props}
    />)} />
    <Route path="/home" render={props => <Map isMarkerShown
                                           googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB8TVrna1xySPsYSqwlK_Ek0rG25uzYWI0"
                                           loadingElement={<div id={"loadingElement"} />}
                                           containerElement={<div id={"containerElement"} />}
                                           mapElement={<div id={"mapElement"} />}
                                           {...props}
    />} />
  </Switch>
);

export default App;
