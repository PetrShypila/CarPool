import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

import * as markerActions from '../../actions/markerActions';
import MarkerList from './MarkerList';

class Map extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {markers} = this.props;
    return (
      <GoogleMap
        defaultZoom= {this.props.defaultZoom}
        defaultCenter={{ lat: 50.0602958, lng: 19.9384682 }}
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

