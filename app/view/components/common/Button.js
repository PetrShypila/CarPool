import React from 'react';
import PropTypes from "prop-types";

Button.propTypes = {
  text : PropTypes.string.isRequired,
  onClick : PropTypes.func.isRequired
};

function Button({text, onClick}) {
  return (
    <button type="button" className="btn btn-primary btn-sm btn-request" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
