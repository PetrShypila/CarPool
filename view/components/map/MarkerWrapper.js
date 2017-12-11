import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as markerActions from '../../actions/markerActions';
import * as directionsActions from '../../actions/directionsActions';

import { Marker, InfoWindow } from "react-google-maps";

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
    this.toggleInfoBox();
    this.buildRouteToHost();
  }

  render() {
    return <Marker key={this.props.marker._id}
                   position={this.props.marker.coordinates}
                   defaultIcon={{
                     url: this.props.marker.icon,
                     scaledSize: {height: 64, width: 64}
                   }}
                   visible={this.props.marker.visible}
                   onClick={this.markerClicked}
    >
      {this.props.marker.infoBoxVisible &&
      <InfoWindow onCloseClick={this.markerClicked} >
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
    buildRouteToHost: PropTypes.func.isRequired
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
