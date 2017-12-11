import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as markerActions from '../../actions/markerActions';
import * as directionsActions from '../../actions/directionsActions';

import { Marker, InfoWindow } from "react-google-maps";

const markerIcons = {
  company: "http://www.myiconfinder.com/uploads/iconsets/256-256-a5485b563efc4511e0cd8bd04ad0fe9e.png",
  driver: "https://d30y9cdsu7xlg0.cloudfront.net/png/5551-200.png",
  passenger: "http://www.myiconfinder.com/uploads/iconsets/256-256-76f453c62108782f0cad9bfc2da1ae9d.png",
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
                     scaledSize: {height: 64, width: 64}
                   }}
                   visible={this.props.marker.visible}
                   onClick={this.markerClicked}
    >
      {this.props.marker.infoBoxVisible &&
      <InfoWindow onCloseClick={this.toggleInfoBox} >
        <div>Hello World!</div>
      </InfoWindow>
      }
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
