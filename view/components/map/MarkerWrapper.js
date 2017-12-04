import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as markerActions from '../../actions/markerActions';

import { Marker, InfoWindow } from "react-google-maps";

class MarkerWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.toggleInfoBox = this.toggleInfoBox.bind(this);
  }

  toggleInfoBox() {
    this.props.actions.showMarkerInfoBox(this.props.marker.id);
  }

  render() {
    return <Marker key={this.props.marker.id}
                   position={this.props.marker}
                   defaultIcon={{
                     url: this.props.marker.icon,
                     scaledSize: {height: 64, width: 64}
                   }}
                   onClick={this.toggleInfoBox}
    >
      {this.props.infoBoxVisible &&
      <InfoWindow>
        <div>Hello World!</div>
      </InfoWindow>
      }
    </Marker>;
  }
}

MarkerWrapper.propTypes = {
  marker: PropTypes.object.isRequired,
  infoBoxVisible: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const actualMarker = state.markers.find(marker => ownProps.marker.id === marker.id ? marker : false);
  actualMarker.infoBoxVisible = !!actualMarker.infoBoxVisible;

  return {
    infoBoxVisible: actualMarker.infoBoxVisible
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(markerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerWrapper);
