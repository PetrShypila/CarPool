import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as markerActions from '../../actions/markersActions';
import * as directionsActions from '../../actions/directionsActions';

import { Marker } from "react-google-maps";
import UserInfoBox from './UserInfoBox';
import * as Constants from "../../store/constants";

const markerIcons = {
  [Constants.TYPE_COMPANY]: "http://maps.gstatic.com/mapfiles/ms2/micons/rangerstation.png",
  [Constants.TYPE_DRIVER]: "http://maps.gstatic.com/mapfiles/ms2/micons/cabs.png",
  [Constants.TYPE_PASSENGER]: "http://maps.gstatic.com/mapfiles/ms2/micons/man.png",
  [Constants.TYPE_USER]: "http://maps.gstatic.com/mapfiles/ms2/micons/homegardenbusiness.png",
};

class MarkerWrapper extends React.Component {


  constructor(props, context) {
    super(props, context);

    this.markerClicked = this.markerClicked.bind(this);
    this.toggleInfoBox = this.toggleInfoBox.bind(this);
    this.getMarkerIcon = this.getMarkerIcon.bind(this);
  }

  toggleInfoBox() {
    this.props.actions.showMarkerInfoBox(this.props.marker._id);
  }

  buildRouteToHost() {
    const direction = {
      origin: this.props.marker.coordinates,
      destination: this.props.host.coordinates
    };

    this.props.actions.buildRouteToHost(direction);
  }

  markerClicked() {
    this.props.actions.hideAllInfoBoxes();
    this.toggleInfoBox();
    this.buildRouteToHost();
  }

  getMarkerIcon(marker, username) {
    if(marker.username === username) {
      return markerIcons[Constants.TYPE_USER];
    } else {
      return markerIcons[marker.type];
    }
  }

  render() {
    return <Marker key={this.props.marker._id}
                   position={this.props.marker.coordinates}
                   defaultIcon={{
                     url: this.getMarkerIcon(this.props.marker, this.props.username),
                     scaledSize: {height: 32, width: 32}
                   }}
                   visible={this.props.marker.visible}
                   onClick={this.markerClicked}
    >
      { this.props.marker.infoBoxVisible && <UserInfoBox username={this.props.marker.username} toggleInfoBox={this.toggleInfoBox}/> }
    </Marker>;
  }
}

MarkerWrapper.propTypes = {
  host: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  marker: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    showMarkerInfoBox: PropTypes.func.isRequired,
    buildRouteToHost: PropTypes.func.isRequired,
    hideAllInfoBoxes: PropTypes.func.isRequired
  })
};

function mapStateToProps(state, ownProps) {
  const host = state.markers.find(marker => marker.type === Constants.TYPE_COMPANY ? marker : false);

  return {
    host: host
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, markerActions, directionsActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerWrapper);
