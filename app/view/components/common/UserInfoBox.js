/* eslint-disable no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { InfoWindow } from "react-google-maps";
import * as usersActions from '../../actions/usersActions';
import * as Constants from "../../store/constants";
import ConnectionsApi from '../../api/ConnectionsApi';

class UserInfoBox extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      imageLoaded: false
    };

    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.sendConnectionRequest = this.sendConnectionRequest.bind(this);
  }

  onImageLoaded() {
    this.setState({imageLoaded: true});
  }

  sendConnectionRequest(event){
    debugger;
    ConnectionsApi.createNewConnection(this.props.user.username, this.props.marker.type);
  }

  render() {
    let infoBox = null;
    if(this.props.user) {
      const userFullName = `${this.props.user.firstname} ${this.props.user.lastname}`;
      infoBox = (
        <div className="user-info-box">
          <img src={this.props.user.pic}
               alt={userFullName}
               className="user-pic"
               onLoad={this.onImageLoaded}
               style={{visibility: this.state.imageLoaded ? 'visible' : 'hidden' }}
          />
          <div className="user-info">
            <div><b>{userFullName}</b></div>
            <div><a href={`mailto:${this.props.user.username}`}>{`${this.props.user.username}`}</a></div>
            <div>{`${this.props.user.phone}`}</div>
            {
              this.props.showButton &&
              <button type="button" className="btn btn-primary btn-sm btn-request" onClick={this.sendConnectionRequest}>
                {`Suggest to be my ${this.props.marker.type === Constants.TYPE_PASSENGER ? 'passenger' : 'driver'}`}
              </button>
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
  marker : PropTypes.object.isRequired,
  showButton : PropTypes.bool.isRequired,
  user : PropTypes.object,
  toggleInfoBox : PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: getUserByUsername(state.users, ownProps.marker.username)
  };
}

function getUserByUsername(users, username) {
  const targetUser = users.filter(user => user.username === username);
  if(targetUser.length) return targetUser[0];
  return null;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(usersActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoBox);

