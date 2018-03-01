import * as React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const RightSideControls = ({onLogout}) => (
  <div className="control-buttons">
    <Link to={`/profile`}>Profile</Link>
    <button type="button" className="btn btn-primary btn-sm" onClick={onLogout}>
      Logout
    </button>
  </div>
);

RightSideControls.propTypes = {
  onLogout : PropTypes.func.isRequired
};

export default RightSideControls;
