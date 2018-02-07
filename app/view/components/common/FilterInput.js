import React from 'react';
import PropTypes from 'prop-types';

const FilterInput = ({name, label, value, checked, onChange, imageUrl}) => (
  <div className="field">
    <label htmlFor={name}><input type={"checkbox"} name={name} value={value} checked={checked} onChange={onChange} />  <img src={imageUrl} width="32" height="32"/> {label}</label>
  </div>
);

FilterInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default FilterInput;
