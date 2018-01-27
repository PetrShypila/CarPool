import React from 'react';
import PropTypes from "prop-types";
import {GoogleMap, Marker} from "react-google-maps";

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
            url: "http://maps.gstatic.com/mapfiles/ms2/micons/homegardenbusiness.png",
            scaledSize: {height: 32, width: 32}
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
