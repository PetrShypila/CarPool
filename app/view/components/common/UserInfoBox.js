/* eslint-disable no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { InfoWindow } from "react-google-maps";
import * as usersActions from '../../actions/usersActions';

class UserInfoBox extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  buildInfoBox(user) {
    const userFullName = `${user.firstname} ${user.lastname}`;

    return (
      <div className="user-info-box">
        <img src={this.props.user.pic} alt={userFullName} className="user-pic" />
        <div className="user-info">
          <div><b>{userFullName}</b></div>
          <div><a href={`mailto:${user.username}`}>{`${user.username}`}</a></div>
          <div>{`${user.phone}`}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <InfoWindow onCloseClick={this.props.toggleInfoBox} >
        {
          this.props.user ?
          this.buildInfoBox(this.props.user) :
          <div>{this.props.username}</div>
        }
      </InfoWindow>
    );
  }
}

UserInfoBox.propTypes = {
  username : PropTypes.string.isRequired,
  user : PropTypes.object,
  toggleInfoBox : PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: getUserByUsername(state.users, ownProps.username)
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

