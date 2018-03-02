import * as React from "react";
import * as Constants from "../../store/constants";
import PropTypes from "prop-types";

const InboxRequest = ({onAccept, onDecline, connection,  user}) => (
  <div className="inbox-request">
    <div className="user-info">
      <div><b>{`${user.firstname} ${user.lastname}`}</b></div>
      <div><a href={`mailto:${user.username}`}>{`${user.username}`}</a></div>
      <div>{`${user.phone}`}</div>
    </div>
  </div>
);

InboxRequest.propTypes = {
  connection : PropTypes.object.isRequired,
  user : PropTypes.object.isRequired,
  onAccept : PropTypes.func,
  onDecline : PropTypes.func
};

export default InboxRequest;
