/* eslint-disable no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

import MarkerWrapper from '../common/MarkerWrapper';
import CheckBoxInput from '../common/CheckBoxInput';
import * as Constants from '../../store/constants';
import * as markerActions from '../../actions/markersActions';
import * as usersActions from "../../actions/usersActions";
import * as directionsActions from "../../actions/directionsActions";
import {Link} from "react-router-dom";

class Map extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      markers:[],
      types: {
        [Constants.TYPE_DRIVER]: true,
        [Constants.TYPE_PASSENGER]: true,
      }
    };

    this.onMapClick = this.onMapClick.bind(this);
    this.filterMarkers = this.filterMarkers.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMarkers();
    this.props.actions.loadActiveUser();
    this.props.actions.loadUsers();
  }

  onMapClick() {
    this.props.actions.cleanRoutes();
    this.props.actions.hideAllInfoBoxes();
  }

  filterMarkers(event){
    const {types} = this.state;
    types[event.target.value] = event.target.checked;
    this.setState({types});

    if(event.target.checked) {
      this.props.actions.addToMap(event.target.value);
    } else {
      this.props.actions.hideFromMap(event.target.value);
    }
  }

  render() {
    const {markers, directions, activeUser} = this.props;

    return (
      <div style={{display: "flex"}}>
        <div className="filter-buttons">
          <CheckBoxInput name={"types-filter"}
                         label={"Passengers"}
                         value={Constants.TYPE_PASSENGER}
                         checked={this.state.types[Constants.TYPE_PASSENGER]}
                         onChange={this.filterMarkers}
          />
          <CheckBoxInput name={"types-filter"}
                         label={"Drivers"}
                         value={Constants.TYPE_DRIVER}
                         checked={this.state.types[Constants.TYPE_DRIVER]}
                         onChange={this.filterMarkers}
          />
        </div>
        <GoogleMap
          defaultZoom= {Constants.MAP_DEF_ZOOM}
          defaultCenter={Constants.MAP_CENTER}
          onClick={this.onMapClick}
          options={{disableDefaultUI: true, zoomControl: true, zoomControlOptions: { style: google.maps.ZoomControlStyle.LARGE }}}
        >
          {markers && activeUser && markers.map(m => {
            m.type = m.username === activeUser.username ? Constants.TYPE_USER : m.type;
            return <MarkerWrapper key={m._id} marker={m} />;
          })}
          {directions && <DirectionsRenderer options={{suppressMarkers: true, preserveViewport:true}} directions={directions} />}
        </GoogleMap>
        <div className="control-buttons">
          <Link to={`/profile`}>Profile</Link>
          <Link to={`/logout`}>Logout</Link>
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  isMarkerShown : PropTypes.bool.isRequired,
  markers : PropTypes.array,
  directions : PropTypes.object,
  activeUser : PropTypes.object,
  actions : PropTypes.shape({
    loadMarkers: PropTypes.func.isRequired,
    loadActiveUser: PropTypes.func.isRequired,
    loadUsers: PropTypes.func.isRequired,
    cleanRoutes: PropTypes.func.isRequired,
    addToMap: PropTypes.func.isRequired,
    hideFromMap: PropTypes.func.isRequired,
    hideAllInfoBoxes: PropTypes.func.isRequired
  }),
};

function mapStateToProps(state, ownProps) {
  const {markers, directions, activeUser} = state;
  return {markers, directions, activeUser};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, markerActions, directionsActions, usersActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(Map)));

