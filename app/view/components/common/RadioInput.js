import React from 'react';
import PropTypes from 'prop-types';

const RadioInput = ({name, label, onChange, checked, value, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>

      <div className="field">
        <input
          type="radio"
          name={name}
          checked={checked}
          value={value}
          onChange={onChange}
          style={{marginRight: '10px'}}
        />{label}<br/>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>

    </div>
  );
};

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default RadioInput;
