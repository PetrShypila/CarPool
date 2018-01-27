import React from 'react';
import PropTypes from "prop-types";
import * as Constants from '../../store/constants';
import TextInput from "../common/TextInput";
import CheckBoxInput from "../common/CheckBoxInput";

const ProfileForm = ({user, types, onChange, onCheckBoxChange}) => (
  <div>
    <TextInput name={'firstname'} label={'First name: '} value={user.firstname} onChange={onChange}/>
    <TextInput name={'lastname'} label={'Last name: '} value={user.lastname} onChange={onChange}/>
    <TextInput name={'phone'} label={'Phone: '} value={user.phone + ''} onChange={onChange}/>
    <div>
      As who you want to be presented on a map:
      <CheckBoxInput name={"type"} label={"Driver"} value={Constants.TYPE_DRIVER} checked={!!types.driver} onChange={onCheckBoxChange}/>
      <CheckBoxInput name={"type"} label={"Passenger"} value={Constants.TYPE_PASSENGER} checked={!!types.passenger} onChange={onCheckBoxChange}/>
    </div>
  </div>
);

ProfileForm.propTypes = {
  user : PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    phone: PropTypes.any.isRequired,
  }),
  types : PropTypes.object.isRequired,
  onChange : PropTypes.func.isRequired,
  onCheckBoxChange: PropTypes.func.isRequired
};

export default ProfileForm;
