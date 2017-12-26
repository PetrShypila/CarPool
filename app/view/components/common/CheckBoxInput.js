import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxInput = ({name, label, value, onChange}) => {
  return (
      <div className="field">
        <input type={"checkbox"} id={name} value={value} defaultChecked onChange={onChange} />
        <label htmlFor={name}>{label}</label>
      </div>
  );
};

CheckBoxInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CheckBoxInput;
