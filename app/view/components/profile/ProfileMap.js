import React from 'react';
import PropTypes from "prop-types";
import {GoogleMap, Marker} from "react-google-maps";

import * as Constants from '../../store/constants';

const ProfileMap = ({zoom, homeLoc, showMarker, onMapClick}) => (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={homeLoc}
      onClick={onMapClick}
    >
      {showMarker ?
        <Marker
          visible
          position={homeLoc}
          defaultIcon={{
            url: Constants.ICON_USER,
            scaledSize: {height: 48, width: 48}
          }}
        /> :
        null
      }
    </GoogleMap>
);

ProfileMap.propTypes = {
  zoom : PropTypes.number.isRequired,
  homeLoc : PropTypes.object.isRequired,
  showMarker : PropTypes.bool.isRequired,
  onMapClick: PropTypes.func.isRequired
};

export default ProfileMap;
