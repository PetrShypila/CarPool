import React from 'react';
import PropTypes from "prop-types";
import {GoogleMap, InfoWindow, Marker} from "react-google-maps";

import * as Constants from '../../store/constants';
import UserInfoBox from "../home/UserInfoBox";

ProfileMap.propTypes = {
  zoom : PropTypes.number.isRequired,
  homeLoc : PropTypes.object.isRequired,
  officeMarker : PropTypes.object,
  showMarker : PropTypes.bool.isRequired,
  onMapClick: PropTypes.func.isRequired
};

function ProfileMap({zoom, homeLoc, showMarker, onMapClick, officeMarker}) {
  return (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={homeLoc}
      onClick={onMapClick}
    >
      { officeMarker && <Marker
                            visible
                            position={officeMarker}
                            defaultIcon={{
                              url: Constants.ICON_COMPANY,
                              scaledSize: {height: 48, width: 48}
                            }} >
        <InfoWindow>
          <div>Your office is here</div>
        </InfoWindow>
      </Marker> }

      { showMarker && <Marker
                          visible
                          position={homeLoc}
                          defaultIcon={{
                            url: Constants.ICON_USER,
                            scaledSize: {height: 48, width: 48}
                          }} /> }
    </GoogleMap>
  );
}

export default ProfileMap;
