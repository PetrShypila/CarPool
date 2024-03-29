import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxInput = ({name, label, value, checked, onChange}) => (
  <div className="field">
    <label htmlFor={name}><input type={"checkbox"} name={name} value={value} checked={checked} onChange={onChange} /> {label}</label>
  </div>
);

CheckBoxInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CheckBoxInput;
