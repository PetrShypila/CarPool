import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import ProfileForm from "./ProfileForm";
import * as Constants from "../../store/constants";
import * as usersActions from "../../actions/usersActions";
import * as markerActions from "../../actions/markersActions";
import ProfileMap from "./ProfileMap";
import {Link} from "react-router-dom";
import * as authActions from "../../actions/authActions";

class Profile extends React.Component {

  constructor(props, context) {
    super(props, context);

    const {homeLoc, showMarker, activeTypes, activeUser} = props;

    this.state = {
      homeLoc, showMarker, activeTypes, activeUser
    };

    this.userDataChange = this.userDataChange.bind(this);
    this.userTypeChange = this.userTypeChange.bind(this);
    this.userPhoneChange = this.userPhoneChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.updateMarker = this.updateMarker.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMarkers();
    this.props.actions.loadActiveUser();
  }

  componentWillReceiveProps(nextProps){
    const {homeLoc, showMarker, activeUser, activeTypes} = nextProps;
    this.setState({homeLoc, showMarker, activeUser, activeTypes});
  }

  submitForm(event) {
    let profile = {
      user: this.state.activeUser
    };

    if(this.state.showMarker) {
      profile.types = this.state.activeTypes;
      profile.latLng = this.state.homeLoc;

    }

    this.props.actions.updateProfile(profile);

    event.preventDefault();
  }

  userDataChange(event) {
    event.preventDefault();
    const {activeUser} = this.state;
    activeUser[event.target.name] = event.target.value;
    this.setState({activeUser});
  }

  userTypeChange(event) {
    const {activeTypes} = this.state;
    activeTypes[event.target.value] = event.target.checked;

    this.setState({activeTypes});
  }

  userPhoneChange(phone) {
    const {activeUser} = this.state;
    activeUser.phone = phone;
    this.setState({activeUser});
  }

  updateMarker(event) {
    const showMarker = true;
    const homeLoc = {lat: event.latLng.lat(), lng: event.latLng.lng() };
    this.setState({homeLoc, showMarker});
  }

  onLogoutClick(){
    this.props.actions.logoutUser();
  }

  render() {
    return (
      <div  style={{display: "flex"}}>

        <div  className="filter-buttons">
          <form onSubmit={this.submitForm}>
            <ProfileForm user={this.state.activeUser}
                         types={this.state.activeTypes}
                         onNameChange={this.userDataChange}
                         onCheckBoxChange={this.userTypeChange}
                         onPhoneChange={this.userPhoneChange}
            />
            <input type="submit" className="btn btn-primary btn-sm" value="Save" />
          </form>
        </div>

        <ProfileMap zoom={Constants.MAP_DEF_ZOOM}
                    homeLoc={this.state.homeLoc}
                    showMarker={this.state.showMarker}
                    onMapClick={this.updateMarker}
        />
        <div className="filter-buttons control-buttons">
          <Link to={`/home`}>Home</Link>
          <button onClick={this.onLogoutClick} className="btn btn-primary btn-sm">Logout</button>
        </div>
      </div>
        );
  }
}

function mapStateToProps(state, ownProps) {
  const containerState = {
    homeLoc: Constants.MAP_CENTER,
    showMarker: false,
    activeTypes: {},
    activeUser: {firstname: '', lastname: '', phone: ''}
  };

  if(state.markers && state.activeUser) {
    containerState.activeUser = state.activeUser;

    state.markers.some(m => {
      if(m.username === containerState.activeUser.username) {
        containerState.activeTypes[m.type] = true;
        containerState.homeLoc = m.coordinates;
        containerState.showMarker = true;
      }

      return Object.values(containerState.activeTypes).length === 2;
    });
  }

  return containerState;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, markerActions, usersActions, authActions), dispatch)
  };
}

Profile.propTypes = {
  homeLoc : PropTypes.object.isRequired,
  showMarker : PropTypes.bool.isRequired,
  activeUser : PropTypes.object.isRequired,
  activeTypes : PropTypes.object.isRequired,

  actions : PropTypes.shape({
    loadMarkers: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    loadActiveUser: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(Profile)));
