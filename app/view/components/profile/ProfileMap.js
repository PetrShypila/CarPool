import React from 'react';
import PropTypes from "prop-types";
import {GoogleMap, Marker} from "react-google-maps";

import * as Constants from '../../store/constants';
import UserInfoBox from "../home/UserInfoBox";

const ProfileMap = ({zoom, homeLoc, showMarker, onMapClick, officeMarker}) => (
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
        <UserInfoBox showButton={false}
                     marker={{username: `Your office is here!`}}
                     toggleInfoBox={() => {}}/>
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

ProfileMap.propTypes = {
  zoom : PropTypes.number.isRequired,
  homeLoc : PropTypes.object.isRequired,
  officeMarker : PropTypes.object,
  showMarker : PropTypes.bool.isRequired,
  onMapClick: PropTypes.func.isRequired
};

export default ProfileMap;
