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

  render() {
    const userFullName = `${this.props.user.firstName} ${this.props.user.lastName}`;

    return (
      <InfoWindow onCloseClick={this.props.toggleInfoBox} >
        {this.props.user ?
          <div className="user-info-box">
            <img src={this.props.user.pic} alt={userFullName} className="user-pic" />
            <div className="user-info">
              <div><b>{userFullName}</b></div>
              <div><a href={`mailto:${this.props.user.email}`}>{`${this.props.user.email}`}</a></div>
              <div>{`+${this.props.user.phone}`}</div>
            </div>
          </div> :
          <div>{this.props.username}</div>}
      </InfoWindow>
    );
  }
}

UserInfoBox.propTypes = {
  username : PropTypes.string.isRequired,
  user : PropTypes.object.isRequired,
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

