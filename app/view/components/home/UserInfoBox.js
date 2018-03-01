/* eslint-disable no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { InfoWindow } from "react-google-maps";
import * as usersActions from '../../actions/usersActions';
import ConnectionsApi from '../../api/ConnectionsApi';
import ConnectionButton from './ConnectionButton';
import * as Constants from "../../store/constants";
import * as directionsActions from "../../actions/directionsActions";
import * as markerActions from "../../actions/markersActions";
import * as connectionsActions from "../../actions/connectionActions";
import * as authActions from "../../actions/authActions";

class UserInfoBox extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      connectionButtonText: this.updateConnectionButtonText(this.props)
    };

    this.sendConnectionRequest = this.sendConnectionRequest.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({connectionButtonText: this.updateConnectionButtonText(nextProps)});
  }

  updateConnectionButtonText(props) {
    if(props.connection) {
      switch (props.connection.status) {
        case Constants.CONNECTION_STATUS_NEW:
          return `Cancel invitation`;

        case Constants.CONNECTION_STATUS_ACTIVE:
          return `Stop connection`;
      }
    } else {
      return `Suggest to be my ${props.marker.type}`;
    }

  }

  sendConnectionRequest(event){
    if(this.props.connection) {
      switch(this.props.connection.status) {
        case Constants.CONNECTION_STATUS_NEW:
          this.props.actions.cancelConnection(this.props.connection._id);
          break;

        case Constants.CONNECTION_STATUS_ACTIVE:
          this.props.actions.stopConnection(this.props.connection._id);
          break;
      }
    } else {
      this.props.actions.createConnection(this.props.user.username, this.props.marker.type);
      this.setState({connectionButtonText: `Invitation sent`});
      event.target.disabled = true;
      event.target.classList.add("disabled");
    }

  }

  render() {
    console.log(`${JSON.stringify(this.props.user)} RERENDERING: ${this.state.connectionButtonText}`);
    let infoBox = null;
    if(this.props.user) {
      const userFullName = `${this.props.user.firstname} ${this.props.user.lastname}`;
      infoBox = (
        <div className="user-info-box">
          <img src={this.props.user.pic}
               alt={userFullName}
               className="user-pic"
          />
          <div className="user-info">
            <div><b>{userFullName}</b></div>
            <div><a href={`mailto:${this.props.user.username}`}>{`${this.props.user.username}`}</a></div>
            <div>{`${this.props.user.phone}`}</div>
            {
              this.props.showButton &&
              <ConnectionButton onClick={this.sendConnectionRequest} text={this.state.connectionButtonText}/>
            }
          </div>
        </div>
      );
    } else {
      infoBox = <div>{this.props.marker.username}</div>;
    }

    return (
      <InfoWindow onCloseClick={this.props.toggleInfoBox} >
        {
          infoBox
        }
      </InfoWindow>
    );
  }
}

UserInfoBox.propTypes = {
  user : PropTypes.object,
  connection : PropTypes.object,
  marker : PropTypes.object.isRequired,
  showButton : PropTypes.bool.isRequired,
  toggleInfoBox : PropTypes.func.isRequired,
  actions : PropTypes.shape({
    getConnections: PropTypes.func.isRequired,
    createConnection: PropTypes.func.isRequired
  }),
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.users.find(user => user.username === ownProps.marker.username),
    connection: state.connections.find(conn => conn.receiver === ownProps.marker.username),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, connectionsActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoBox);

