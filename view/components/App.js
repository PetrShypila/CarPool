/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Map from './map/Map';
import Login from "./Login";

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route path="/map" render={(props) => <Map isMarkerShown
                                           googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB8TVrna1xySPsYSqwlK_Ek0rG25uzYWI0"
                                           loadingElement={<div id={"loadingElement"} />}
                                           containerElement={<div id={"containerElement"} />}
                                           mapElement={<div id={"mapElement"} />}
                                           {...props}
    />} />
  </Switch>
);

export default App;
