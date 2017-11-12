import React from 'react';
import PropTypes from 'prop-types';

import { Marker } from "react-google-maps";

const MarkerList = (props) => (
  <div>
    {props.markers.map(marker =>
      <Marker key={marker.id} position={marker} />
    )}
  </div>
);

MarkerList.propTypes = {
  markers: PropTypes.array.isRequired
};

export default MarkerList;
