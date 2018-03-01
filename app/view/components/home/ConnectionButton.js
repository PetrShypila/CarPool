import React from 'react';
import PropTypes from "prop-types";

const ConnectionButton = ({text, onClick}) => (
  <button type="button" className="btn btn-primary btn-sm btn-request" onClick={onClick}>
    {text}
  </button>
);

ConnectionButton.propTypes = {
  text : PropTypes.string.isRequired,
  onClick : PropTypes.func.isRequired
};


export default ConnectionButton;
