import * as React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

RightSideControls.propTypes = {
  activeUser: PropTypes.object,
  onLogout : PropTypes.func.isRequired
};

function RightSideControls({activeUser, onLogout}){
  return (
    <div className="control-buttons">
      <Link to={`/profile`}>
        {`${activeUser ? `${activeUser.firstname} ${activeUser.lastname}` : `Profile`}`}
        </Link>
      <button type="button" className="btn btn-primary btn-sm" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}


export default RightSideControls;
