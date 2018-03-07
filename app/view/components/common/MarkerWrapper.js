import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as markerActions from '../../actions/markersActions';
import * as directionsActions from '../../actions/directionsActions';

import {InfoWindow, Marker} from "react-google-maps";
import UserInfoBox from '../home/UserInfoBox';
import * as Constants from "../../store/constants";

const markerIcons = {
  [Constants.TYPE_COMPANY]: Constants.ICON_COMPANY,
  [Constants.TYPE_DRIVER]: Constants.ICON_DRIVER,
  [Constants.TYPE_PASSENGER]: Constants.ICON_PASSENGER,
  [Constants.TYPE_USER]: Constants.ICON_USER,
};

class MarkerWrapper extends React.Component {
  static propTypes = {
    connection: PropTypes.object,
    user: PropTypes.object,
    host: PropTypes.object.isRequired,
    activeUser: PropTypes.object.isRequired,
    marker: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      toggleMarkerInfoBox: PropTypes.func.isRequired,
      buildRouteToHost: PropTypes.func.isRequired,
      hideAllInfoBoxes: PropTypes.func.isRequired
    })
  };

  state = {
    markerClicked: false
  };

  toggleInfoBox = () => {
    this.props.actions.toggleMarkerInfoBox(this.props.marker._id);
  };

  buildRouteToHost = () => {
    const direction = {
      origin: this.props.marker.coordinates,
      destination: this.props.host.coordinates
    };

    this.props.actions.buildRouteToHost(direction);
  };

  markerClicked = () => {
    this.buildRouteToHost();
    this.setState({markerClicked: true});
  };

  onMouseOut = () => {
    if(! this.state.markerClicked) {
      this.props.actions.hideAllInfoBoxes();
    }
  };

  onMouseOver = () => {
    this.toggleInfoBox();
  };

  getMarkerIcon = (marker, username) =>  {
    if(marker.username === username) {
      return markerIcons[Constants.TYPE_USER];
    } else {
      return markerIcons[marker.type];
    }
  };

  onlyPassenger = (user) => {
    return user.types.length === 1 && user.types[0] === Constants.TYPE_PASSENGER;
  };

  render() {
    const {marker, user, connection, activeUser} = this.props;

    return <Marker position={marker.coordinates}
                   defaultIcon={{
                     url: this.getMarkerIcon(marker, activeUser.username),
                     scaledSize: {height: 48, width: 48}
                   }}
                   visible={marker.visible}
                   onClick={this.markerClicked}
                   onMouseOver={this.onMouseOver}
                   onMouseOut={this.onMouseOut}
    >
      { marker.infoBoxVisible &&
        <InfoWindow onCloseClick={this.toggleInfoBox}>
          {user ?
            <UserInfoBox
              showDetails
              user = {user}
              markerId={marker._id}
              serviceType={marker.type}
              connection={connection}
              activeUsername={activeUser.username}
              showButton={
                (activeUser.username !== marker.username) &&
                !(marker.type === Constants.TYPE_PASSENGER && this.onlyPassenger(activeUser))
              } /> :
            <div>Your office is here</div>}
        </InfoWindow>
      }
    </Marker>;
  }
}

function mapStateToProps(state, ownProps) {
  const host = state.markers.find(marker => marker.type === Constants.TYPE_COMPANY);

  return { host };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, markerActions, directionsActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerWrapper);
