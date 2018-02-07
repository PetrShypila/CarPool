/* eslint-disable no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

import MarkerWrapper from '../common/MarkerWrapper';
import FilterInput from '../common/FilterInput';
import * as Constants from '../../store/constants';
import * as markerActions from '../../actions/markersActions';
import * as usersActions from "../../actions/usersActions";
import * as directionsActions from "../../actions/directionsActions";
import * as authActions from "../../actions/authActions";
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
    this.onLogoutClick = this.onLogoutClick.bind(this);
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

  onLogoutClick() {
    this.props.actions.logoutUser();
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
        <div className="left-panel">
          <div className="filters">
            <FilterInput name={"types-filter"}
                         label={"Show passengers"}
                         value={Constants.TYPE_PASSENGER}
                         checked={this.state.types[Constants.TYPE_PASSENGER]}
                         onChange={this.filterMarkers}
                         imageUrl={Constants.ICON_PASSENGER}
            />
            <FilterInput name={"types-filter"}
                         label={"Show drivers"}
                         value={Constants.TYPE_DRIVER}
                         checked={this.state.types[Constants.TYPE_DRIVER]}
                         onChange={this.filterMarkers}
                         imageUrl={Constants.ICON_DRIVER}
            />
          </div>
          <div className="info">
            <span><b>Info section:</b></span>
            <br/>
            <br/>
            <div><p><img src={Constants.ICON_USER} width="32" height="32"/> - Your home</p></div>
            <div><p><img src={Constants.ICON_COMPANY} width="32" height="32"/> - Your office</p></div>
            <div><p><img src={Constants.ICON_PASSENGER} width="32" height="32"/> - Looking for a company to the office</p></div>
            <div><p><img src={Constants.ICON_DRIVER} width="32" height="32"/> - Willing to pick somebody to the office</p></div>
          </div>
        </div>

        <GoogleMap
          defaultZoom= {Constants.MAP_DEF_ZOOM}
          defaultCenter={Constants.MAP_CENTER}
          onClick={this.onMapClick}
          options={{disableDefaultUI: true, zoomControl: true, zoomControlOptions: { style: google.maps.ZoomControlStyle.LARGE }}}
        >
          {markers && activeUser && markers.map(m => (<MarkerWrapper key={m._id} marker={m} username={activeUser.username} />))}
          {directions && <DirectionsRenderer options={{suppressMarkers: true, preserveViewport:true}} directions={directions} />}
        </GoogleMap>

        <div className="control-buttons">
          <Link to={`/profile`}>Profile</Link>
          <button type="button" className="btn btn-primary btn-sm" onClick={this.onLogoutClick}>
            Logout
          </button>
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
    logoutUser: PropTypes.func.isRequired,
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
    actions: bindActionCreators(Object.assign({}, markerActions, directionsActions, usersActions, authActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(Map)));

