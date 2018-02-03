import React from 'react';
import PropTypes from "prop-types";
import Phone from 'react-phone-number-input';
import rrui from '../../styles/rrui.css';
import rpni from '../../styles/style.css';
import * as Constants from '../../store/constants';
import TextInput from "../common/TextInput";
import CheckBoxInput from "../common/CheckBoxInput";

const ProfileForm = ({user, types, onNameChange, onCheckBoxChange, onPhoneChange}) => {
  return (
    <div>
      <TextInput name={'firstname'}
                 label={'First name: '}
                 value={user.firstname}
                 onChange={onNameChange}/>
      <TextInput name={'lastname'}
                 label={'Last name: '}
                 value={user.lastname}
                 onChange={onNameChange}/>
      <Phone
        country="PL"
        placeholder="Phone number"
        value={user.phone}
        onChange={onPhoneChange}/>
      <div>
        As who you want to be presented on a map:
        <CheckBoxInput name={"type"} label={"Driver"} value={Constants.TYPE_DRIVER} checked={!!types.driver} onChange={onCheckBoxChange}/>
        <CheckBoxInput name={"type"} label={"Passenger"} value={Constants.TYPE_PASSENGER} checked={!!types.passenger} onChange={onCheckBoxChange}/>
      </div>
    </div>
  );
};

ProfileForm.propTypes = {
  user : PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
  types : PropTypes.object.isRequired,
  onNameChange : PropTypes.func.isRequired,
  onPhoneChange : PropTypes.func.isRequired,
  onCheckBoxChange: PropTypes.func.isRequired
};

export default ProfileForm;
