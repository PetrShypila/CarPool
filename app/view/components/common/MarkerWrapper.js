import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as markerActions from '../../actions/markersActions';
import * as directionsActions from '../../actions/directionsActions';

import { Marker } from "react-google-maps";
import UserInfoBox from '../home/UserInfoBox';
import * as Constants from "../../store/constants";

const markerIcons = {
  [Constants.TYPE_COMPANY]: Constants.ICON_COMPANY,
  [Constants.TYPE_DRIVER]: Constants.ICON_DRIVER,
  [Constants.TYPE_PASSENGER]: Constants.ICON_PASSENGER,
  [Constants.TYPE_USER]: Constants.ICON_USER,
};

class MarkerWrapper extends React.Component {


  constructor(props, context) {
    super(props, context);

    this.markerClicked = this.markerClicked.bind(this);
    this.toggleInfoBox = this.toggleInfoBox.bind(this);
    this.getMarkerIcon = this.getMarkerIcon.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);

    this.state = {
      markerClicked: false
    };
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
    this.buildRouteToHost();
    this.setState({markerClicked: true});
  }

  onMouseOut() {
    if(! this.state.markerClicked) {
      this.props.actions.hideAllInfoBoxes();
    }
  }

  onMouseOver() {
    this.toggleInfoBox();
  }

  getMarkerIcon(marker, username) {
    if(marker.username === username) {
      return markerIcons[Constants.TYPE_USER];
    } else {
      return markerIcons[marker.type];
    }
  }

  render() {
    return <Marker position={this.props.marker.coordinates}
                   defaultIcon={{
                     url: this.getMarkerIcon(this.props.marker, this.props.username),
                     scaledSize: {height: 48, width: 48}
                   }}
                   visible={this.props.marker.visible}
                   onClick={this.markerClicked}
                   onMouseOver={this.onMouseOver}
                   onMouseOut={this.onMouseOut}
    >
      { this.props.marker.infoBoxVisible && <UserInfoBox
                                                    marker={this.props.marker}
                                                    showButton={this.props.username !== this.props.marker.username}
                                                    toggleInfoBox={this.toggleInfoBox}/> }
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
