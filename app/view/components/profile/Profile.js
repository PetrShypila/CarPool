import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import ProfileForm from "./ProfileForm";
import * as Constants from "../../store/constants";
import * as usersActions from "../../actions/usersActions";
import * as markerActions from "../../actions/markersActions";
import ProfileMap from "./ProfileMap";
import * as authActions from "../../actions/authActions";

class Profile extends React.Component {
  static propTypes = {
    marker : PropTypes.object,
    activeUser : PropTypes.object,
    officeMarker : PropTypes.object,

    actions : PropTypes.shape({
      loadMarkers: PropTypes.func.isRequired,
      logoutUser: PropTypes.func.isRequired,
      loadActiveUser: PropTypes.func.isRequired,
      updateProfile: PropTypes.func.isRequired
    }),
  };

  state = {
    marker: null,
    profileSaved: false,
    profileSaveError: false,
    activeUser: {firstname: '', lastname: '', phone: '', type: null},
  };

  componentDidMount() {
    this.props.actions.loadMarkers();
    this.props.actions.loadActiveUser();
  }

  componentWillReceiveProps(nextProps, nextContext){
    if(nextProps.activeUser) {
      const {marker, activeUser} = nextProps;
      this.setState({marker, activeUser});
    }
  }

  isProfileFilled = () => {
    return (this.state.activeUser.firstname !== '' &&
      this.state.activeUser.lastname !== '' &&
      this.state.activeUser.phone !== '' &&
      this.state.activeUser.type != null &&
      this.state.marker != null);
  };

  submitForm = (event) => {
    event.preventDefault();

    if(this.isProfileFilled()) {

      const profile = {
        user: this.state.activeUser,
        marker: this.state.marker
      };

      this.props.actions.updateProfile(profile).then(() => {
        this.setState({profileSaved: true, profileSaveError: false});
      }).catch(() => {
        this.setState({profileSaved: false, profileSaveError: true});
      });
    }
  };

  changeUserData = (event) => {

    const {activeUser} = this.state;
    activeUser[event.target.name] = event.target.value;

    this.setState({activeUser});
  };

  changeUserPhone = (phone) => {
    const {activeUser} = this.state;
    activeUser.phone = phone;

    this.setState({activeUser});
  };

  updateMarker = (event) => {
    let {marker} = this.state;

    if(marker === null || marker === undefined) {
      marker = {
        username: this.state.activeUser.username,
        type: this.state.activeUser.type,
      };
    }

    marker.coordinates = {lat: event.latLng.lat(), lng: event.latLng.lng() };

    this.setState({marker});
  };

  render() {
    return (
      <div  style={{display: "flex"}}>

        <div  className="profile-form">
          {this.state.activeUser &&
            <ProfileForm activeUser={this.state.activeUser}
                         profileFilled={this.isProfileFilled()}
                         profileSaved={this.state.profileSaved}
                         profileSaveError={this.state.profileSaveError}
                         onUserDataChange={this.changeUserData}
                         onPhoneChange={this.changeUserPhone}
                         onFormSubmit={this.submitForm} />
          }
        </div>

        <ProfileMap zoom={Constants.MAP_DEF_ZOOM}
                  marker={this.state.marker}
                  officeMarker={this.props.officeMarker}
                  onMapClick={this.updateMarker} />

        <div className="filter-buttons control-buttons">
          <Link to={`/home`}>Home</Link>
          <button onClick={this.props.actions.logoutUser} className="btn btn-primary btn-sm">Logout</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const containerState = {};

  if(state.markers && state.activeUser) {
    containerState.activeUser = state.activeUser;
    containerState.officeMarker = state.markers.find(m => m.type === Constants.TYPE_COMPANY);
    containerState.marker = state.markers.find(m => m.username === state.activeUser.username);
  }

  return containerState;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, markerActions, usersActions, authActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(Profile)));
