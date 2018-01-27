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

class Profile extends React.Component {

  constructor(props, context) {
    super(props, context);

    const {homeLoc, showMarker, activeTypes, activeUser} = props;

    this.state = {
      homeLoc, showMarker, activeTypes, activeUser
    };

    this.userDataChange = this.userDataChange.bind(this);
    this.userTypeChange = this.userTypeChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.updateMarker = this.updateMarker.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMarkers();
    this.props.actions.loadActiveUser();
  }

  componentWillReceiveProps(nextProps){
    const {hemoLoc, showMarker, activeUser, activeTypes} = nextProps;
    this.setState({hemoLoc, showMarker, activeUser, activeTypes});
  }

  submitForm(event) {
    console.log(`submitForm ${JSON.stringify(event.target)}`);
    event.preventDefault();
  }

  userDataChange(event) {
    event.preventDefault();
    const {activeUser} = this.state;
    activeUser[event.target.name] = event.target.value;
    this.setState({activeUser});
  }

  userTypeChange(event) {
    event.preventDefault();
    console.log(`userTypeChange ${event.target}`);
  }

  updateMarker(event) {
    const homeLoc = {lat: event.latLng.lat(), lng: event.latLng.lng() };
    this.setState({homeLoc});
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
          <ProfileForm user={this.state.activeUser}
                       types={this.state.activeTypes}
                       onChange={this.userDataChange}
                       onCheckBoxChange={this.userTypeChange}
          />
          <ProfileMap zoom={Constants.MAP_DEF_ZOOM}
                      homeLoc={this.state.homeLoc}
                      showMarker={this.state.showMarker}
                      onMapClick={this.updateMarker}
          />
        <input type="submit" value="Save" />
      </form>
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
        containerState.activeTypes[m.type] = m.type;
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
    actions: bindActionCreators(Object.assign({}, markerActions, usersActions), dispatch)
  };
}

Profile.propTypes = {
  homeLoc : PropTypes.object.isRequired,
  showMarker : PropTypes.bool.isRequired,
  activeUser : PropTypes.object.isRequired,
  activeTypes : PropTypes.object.isRequired,

  actions : PropTypes.shape({
    loadMarkers: PropTypes.func.isRequired,
    loadActiveUser: PropTypes.func.isRequired
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(Profile)));
