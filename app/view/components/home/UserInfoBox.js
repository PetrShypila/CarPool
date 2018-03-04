/* eslint-disable no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ConnectionButton from '../common/Button';
import * as Constants from "../../store/constants";
import * as connectionsActions from "../../actions/connectionActions";

class UserInfoBox extends React.Component {

  static propTypes = {
    user : PropTypes.object,
    connection : PropTypes.object,
    showButton : PropTypes.bool.isRequired,
    showDetails : PropTypes.bool.isRequired,
    activeUsername : PropTypes.string.isRequired,
    serviceType : PropTypes.string.isRequired,
    actions : PropTypes.shape({
      getConnections: PropTypes.func.isRequired,
      updateConnection: PropTypes.func.isRequired,
      createConnection: PropTypes.func.isRequired
    }),
  };

  applyConnection = () => {
    if(this.props.connection) {
    this.props.actions.updateConnection(this.props.connection._id, Constants.CONNECTION_STATUS_ACTIVE);
    } else {
      this.props.actions.createConnection(this.props.user.username, this.props.serviceType);
    }
  };

  abortConnection = () => {
      switch(this.props.connection.status) {
        case Constants.CONNECTION_STATUS_NEW:
          this.props.actions.updateConnection(this.props.connection._id, Constants.CONNECTION_STATUS_CANCELLED);
          break;

        case Constants.CONNECTION_STATUS_ACTIVE:
          this.props.actions.updateConnection(this.props.connection._id, Constants.CONNECTION_STATUS_STOPPED);
          break;
      }
  };

  buildConnectionButtons = () => {
    const buttons = [];

    if(this.props.connection) {
      if(this.props.activeUsername === this.props.connection.requester) {
        buttons.push(<ConnectionButton key={`requester-${this.props.connection.status}`}
                                       onClick={this.abortConnection}
                                       text={this.props.connection.status === Constants.CONNECTION_STATUS_NEW ?
                                             `Cancel request` :
                                             `Cancel connection`}
        />);
      } else if(this.props.activeUsername === this.props.connection.receiver) {
        if(this.props.connection.status === Constants.CONNECTION_STATUS_NEW) {
          buttons.push(<ConnectionButton key={`receiver-v`}
                                         onClick={this.applyConnection}
                                         text={`V`}
          />);

          buttons.push(<ConnectionButton key={`receiver-x`}
                                         onClick={this.abortConnection}
                                         text={`X`}
          />);
        } else {
          buttons.push(<ConnectionButton key={`receiver-active`}
                                         onClick={this.abortConnection}
                                         text={`Cancel connection`}
          />);
        }
      }

    } else {
      buttons.push(<ConnectionButton key={`connection-new`}
                                     onClick={this.applyConnection}
                                     text={`Suggest to be my ${this.props.serviceType}`}/>);
    }

    return buttons;
  };

  render() {
    const userFullName = `${this.props.user.firstname} ${this.props.user.lastname}`;

    return (
      <div className="user-info-box">
        <img src={this.props.user.pic}
             alt={userFullName}
             className="user-pic"
        />
        <div className="user-info">
          <div><b>{userFullName}</b></div>
          {this.props.showDetails &&
          <div>
            <div><a href={`mailto:${this.props.user.username}`}>{`${this.props.user.username}`}</a></div>
            <div>{`${this.props.user.phone}`}</div>
          </div>
          }
          {
            this.props.showButton &&
            this.buildConnectionButtons()
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, connectionsActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoBox);

