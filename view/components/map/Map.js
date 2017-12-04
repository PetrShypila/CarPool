'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import MarkerWrapper from './MarkerWrapper';
import * as markerActions from '../../actions/markerActions';
import * as Constants from '../../store/constants';

class Map extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.loadMarkers();
  }

  render() {
    const {markers} = this.props;

    return (
      <GoogleMap
        defaultZoom= {Constants.MAP_DEF_ZOOM}
        defaultCenter={Constants.MAP_CENTER}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={10}
        >
        {markers.map(m => (
          <MarkerWrapper key={m.id} marker={m} />
        ))}
        </MarkerClusterer>
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  isMarkerShown : PropTypes.bool.isRequired,
  actions : PropTypes.object.isRequired,
  markers : PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    markers: state.markers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(markerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(Map)));

