'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import MarkerWrapper from './MarkerWrapper';
import * as markerActions from '../../actions/markerActions';
import * as Constants from '../../store/constants';
import * as directionsActions from "../../actions/directionsActions";

class Map extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.onMapClick = this.onMapClick.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
    this.filterDrivers = this.filterDrivers.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMarkers();
  }

  onMapClick() {
    this.props.actions.cleanRoutes();
    this.props.actions.hideAllInfoBoxes();
  }

  filterUsers(){
    this.props.actions.filterMarkers('user');
  }

  filterDrivers(){
    this.props.actions.filterMarkers('driver');
  }

  render() {
    const {markers} = this.props;

    return (
      <div>
        <div className="filter-buttons">
          <div onClick={this.filterUsers}>Users</div>
          <div onClick={this.filterDrivers}>Drivers</div>
        </div>
          <GoogleMap
            defaultZoom= {Constants.MAP_DEF_ZOOM}
            defaultCenter={Constants.MAP_CENTER}
            onClick={this.onMapClick}
            options={{disableDefaultUI: true}}
          >
            <MarkerClusterer
              averageCenter
              enableRetinaIcons
              gridSize={10}
            >
              {markers.map(m => (
                <MarkerWrapper key={m._id} marker={m} />
              ))}
            </MarkerClusterer>
            {this.props.directions && <DirectionsRenderer options={{suppressMarkers: true, preserveViewport:true}} directions={this.props.directions} />}
          </GoogleMap>
      </div>
    );
  }
}

Map.propTypes = {
  isMarkerShown : PropTypes.bool.isRequired,
  markers : PropTypes.array.isRequired,
  directions : PropTypes.object,
  actions : PropTypes.shape({
    loadMarkers: PropTypes.func.isRequired,
    cleanRoutes: PropTypes.func.isRequired,
    filterMarkers: PropTypes.func.isRequired,
    hideAllInfoBoxes: PropTypes.func.isRequired
  }),
};

function mapStateToProps(state, ownProps) {
  return {
    markers: state.markers,
    directions: state.directions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, markerActions, directionsActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(Map)));

