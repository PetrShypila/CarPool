import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as markerActions from '../../actions/markersActions';
import * as directionsActions from '../../actions/directionsActions';

import { Marker, InfoWindow } from "react-google-maps";
import UserInfoBox from './UserInfoBox';

const markerIcons = {
  company: "http://maps.gstatic.com/mapfiles/ms2/micons/rangerstation.png",
  driver: "http://maps.gstatic.com/mapfiles/ms2/micons/red.png",
  passenger: "http://maps.gstatic.com/mapfiles/ms2/micons/blue.png",
};

class MarkerWrapper extends React.Component {


  constructor(props, context) {
    super(props, context);

    this.markerClicked = this.markerClicked.bind(this);
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

  render() {
    return <Marker key={this.props.marker._id}
                   position={this.props.marker.coordinates}
                   defaultIcon={{
                     url: markerIcons[this.props.marker.type],
                     scaledSize: {height: 32, width: 32}
                   }}
                   visible={this.props.marker.visible}
                   onClick={this.markerClicked}
    >
      { this.props.marker.infoBoxVisible && <UserInfoBox username={this.props.marker.username}/> }
    </Marker>;
  }
}

MarkerWrapper.propTypes = {
  host: PropTypes.object.isRequired,
  marker: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    showMarkerInfoBox: PropTypes.func.isRequired,
    buildRouteToHost: PropTypes.func.isRequired,
    hideAllInfoBoxes: PropTypes.func.isRequired
  })
};

function mapStateToProps(state, ownProps) {
  const host = state.markers.find(marker => marker.type === 'company' ? marker : false);

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
