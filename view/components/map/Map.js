/* eslint-disable no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

import MarkerWrapper from './MarkerWrapper';
import CheckBoxInput from '../common/CheckBoxInput';
import * as Constants from '../../store/constants';
import * as markerActions from '../../actions/markerActions';
import * as directionsActions from "../../actions/directionsActions";

class Map extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      markers:[]
    };

    this.onMapClick = this.onMapClick.bind(this);
    this.filterMarkers = this.filterMarkers.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMarkers();
  }

  onMapClick() {
    this.props.actions.cleanRoutes();
    this.props.actions.hideAllInfoBoxes();
  }

  filterMarkers(event){
    if(event.target.checked) {
      this.props.actions.addToMap(event.target.value);
    } else {
      this.props.actions.hideFromMap(event.target.value);
    }
  }

  render() {
    const {markers} = this.props;

    return (
      <div>
        <div className="filter-buttons">
          <CheckBoxInput name={"rider-filter"} label={"Riders"} value={'passenger'} onChange={this.filterMarkers}/>
          <CheckBoxInput name={"driver-filter"} label={"Drivers"} value={'driver'} onChange={this.filterMarkers}/>
        </div>
          <GoogleMap
            defaultZoom= {Constants.MAP_DEF_ZOOM}
            defaultCenter={Constants.MAP_CENTER}
            onClick={this.onMapClick}
            options={{disableDefaultUI: true, zoomControl: true, zoomControlOptions: { style: google.maps.ZoomControlStyle.LARGE }}}
          >
            {markers.map(m => (
              <MarkerWrapper key={m._id} marker={m} />
            ))}
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
    addToMap: PropTypes.func.isRequired,
    hideFromMap: PropTypes.func.isRequired,
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

