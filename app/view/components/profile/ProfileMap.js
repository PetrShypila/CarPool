import React from 'react';
import PropTypes from "prop-types";
import {GoogleMap, InfoWindow, Marker} from "react-google-maps";

import * as Constants from '../../store/constants';
import UserInfoBox from "../home/UserInfoBox";

ProfileMap.propTypes = {
  marker : PropTypes.object,
  officeMarker : PropTypes.object,
  zoom : PropTypes.number.isRequired,
  onMapClick: PropTypes.func.isRequired
};

function ProfileMap({zoom, marker, officeMarker, onMapClick}) {
  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={marker ? marker.coordinates : Constants.MAP_CENTER}
      onClick={onMapClick}
    >
      { officeMarker && <Marker
                            visible
                            position={officeMarker.coordinates}
                            defaultIcon={{
                              url: Constants.ICON_COMPANY,
                              scaledSize: {height: 48, width: 48}
                            }} >
        <InfoWindow>
          <div>Your office is here</div>
        </InfoWindow>
      </Marker> }

      { marker && <Marker
                      visible
                      position={marker.coordinates}
                      defaultIcon={{
                        url: Constants.ICON_USER,
                        scaledSize: {height: 48, width: 48}
                      }} /> }
    </GoogleMap>
  );
}

export default ProfileMap;
