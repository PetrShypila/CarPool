'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

import * as markerActions from '../../actions/markerActions';
import * as Constants from '../../store/constants';
import MarkerList from './MarkerList';

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
        {
          this.props.isMarkerShown && <MarkerList markers={markers}/>
        }
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  isMarkerShown : PropTypes.bool.isRequired,
  actions : PropTypes.object.isRequired,
  defaultZoom : PropTypes.number.isRequired,
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

