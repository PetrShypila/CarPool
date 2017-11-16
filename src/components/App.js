/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Map from './map/Map';
import Index from "./Home";

const App = () => (

  <Switch>
    <Route exact path="/" component={Index} />
    <Route path="/map" render={(props) => <Map isMarkerShown
                                           googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB8TVrna1xySPsYSqwlK_Ek0rG25uzYWI0"
                                           loadingElement={<div style={{ height: `100%` }} />}
                                           containerElement={<div style={{ height: `800px` }} />}
                                           mapElement={<div style={{ height: `100%` }} />}
                                           {...props}
    />} />
  </Switch>
);

export default App;
