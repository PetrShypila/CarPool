/* eslint-disable no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

import MarkerWrapper from '../common/MarkerWrapper';
import * as Constants from '../../store/constants';
import * as markerActions from '../../actions/markersActions';
import * as usersActions from "../../actions/usersActions";
import * as directionsActions from "../../actions/directionsActions";
import * as authActions from "../../actions/authActions";
import * as connectionsActions from '../../actions/connectionActions';
import LeftSidePanel from "./LeftSidePanel";
import RightSideControls from "./RighrSideControls";

class Map extends React.Component {

  static propTypes = {
    users : PropTypes.array,
    markers : PropTypes.array,
    connections : PropTypes.array,
    directions : PropTypes.object,
    activeUser : PropTypes.object,
    isMarkerShown : PropTypes.bool.isRequired,
    actions : PropTypes.shape({
      loadMarkers: PropTypes.func.isRequired,
      loadActiveUser: PropTypes.func.isRequired,
      logoutUser: PropTypes.func.isRequired,
      getConnections: PropTypes.func.isRequired,
      loadUsers: PropTypes.func.isRequired,
      cleanRoutes: PropTypes.func.isRequired,
      addToMap: PropTypes.func.isRequired,
      hideFromMap: PropTypes.func.isRequired,
      hideAllInfoBoxes: PropTypes.func.isRequired
    }),
  };

  state = {
    types: {
      [Constants.TYPE_DRIVER]: true,
      [Constants.TYPE_PASSENGER]: true,
    }
  };

  componentDidMount() {
    this.props.actions.loadMarkers();
    this.props.actions.loadActiveUser();
    this.props.actions.loadUsers();
    this.props.actions.getConnections();
  }

  onMapClick = () => {
    this.props.actions.cleanRoutes();
    this.props.actions.hideAllInfoBoxes();
  };

  onLogoutClick = () => {
    this.props.actions.logoutUser();
  };

  filterMarkers = (event) => {
    const {types} = this.state;
    types[event.target.value] = event.target.checked;
    this.setState({types});

    if(event.target.checked) {
      this.props.actions.addToMap(event.target.value,  this.props.activeUser.username);
    } else {
      this.props.actions.hideFromMap(event.target.value,  this.props.activeUser.username);
    }
  };

  render() {
    const {markers, directions, activeUser, users, connections} = this.props;
    return (
      <div>
        {activeUser && connections && users && markers &&
         <LeftSidePanel connections={connections.filter(c =>
                                        (c.receiver === activeUser.username &&
                                         [Constants.CONNECTION_STATUS_NEW, Constants.CONNECTION_STATUS_ACTIVE].includes(c.status)
                                        ))}
                        users={users}
                        markers={markers}
                        activeUsername={activeUser.username}
                        types={this.state.types}
                        onFilterClick={this.filterMarkers}/>
        }
        <GoogleMap
          defaultZoom= {Constants.MAP_DEF_ZOOM}
          defaultCenter={Constants.MAP_CENTER}
          onClick={this.onMapClick}
          options={{disableDefaultUI: true, zoomControl: true, zoomControlOptions: { style: google.maps.ZoomControlStyle.LARGE }}}
        >
          {activeUser && connections && users &&
           markers.map(m => (<MarkerWrapper key={m._id}
                                            marker={m}
                                            user={users.find(u => u.username === m.username)}
                                            connection={connections.find(c => c.requester === m.username)}
                                            activeUser={activeUser} />))
          }
          {directions && <DirectionsRenderer options={{suppressMarkers: true, preserveViewport:true}} directions={directions} />}
        </GoogleMap>

        <RightSideControls activeUser={activeUser}
                           onLogout={this.onLogoutClick}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {markers, directions, users, connections, activeUser} = state;
  return {markers, directions, users, connections, activeUser};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, markerActions, directionsActions, usersActions, authActions, connectionsActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(Map)));

