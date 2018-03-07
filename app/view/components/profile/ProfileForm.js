import React from 'react';
import PropTypes from "prop-types";
import Phone from 'react-phone-number-input';

import * as Constants from '../../store/constants';
import TextInput from "../common/TextInput";
import RadioInput from "../common/RadioInput";

import rrui from '../../styles/rrui.css';
import rpni from '../../styles/style.css';

ProfileForm.propTypes = {
  activeUser : PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    type: PropTypes.string,
    phone: PropTypes.string.isRequired,
  }),

  profileFilled : PropTypes.bool.isRequired,
  profileSaved : PropTypes.bool.isRequired,
  profileSaveError : PropTypes.bool.isRequired,

  onUserDataChange : PropTypes.func.isRequired,
  onPhoneChange : PropTypes.func.isRequired,
  onFormSubmit : PropTypes.func.isRequired
};

function ProfileForm({activeUser, profileFilled, profileSaved, profileSaveError, onUserDataChange, onPhoneChange, onFormSubmit}) {
  return (
    <form onSubmit={onFormSubmit} style={{border: "none", margin: "10px"}}>
      <div>
        <TextInput name={'firstname'}
                   label={'First name: '}
                   value={activeUser.firstname}
                   onChange={onUserDataChange}/>
        <TextInput name={'lastname'}
                   label={'Last name: '}
                   value={activeUser.lastname}
                   onChange={onUserDataChange}/>
        <Phone
          country="PL"
          placeholder="Phone number"
          value={activeUser.phone}
          onChange={onPhoneChange}/>
        <div>
          <br/>
          As who you want to be presented on a map:
          <br/>
          <br/>
          <div>
            <RadioInput name={"type"}
                        label={"Driver"}
                        value={Constants.TYPE_DRIVER}
                        checked={activeUser.type === Constants.TYPE_DRIVER}
                        onChange={onUserDataChange}/>

            <RadioInput name={"type"}
                        label={"Passenger"}
                        value={Constants.TYPE_PASSENGER}
                        checked={activeUser.type === Constants.TYPE_PASSENGER}
                        onChange={onUserDataChange}/>
          </div>
          <br/>
          {!profileFilled && <p style={{color: "red"}}>Please provide all data and choose your location on a map by left click where is you home.</p>}
          {profileSaved && <p style={{color: "blue"}}>Saved!</p>}
          {profileSaveError && <p style={{color: "blue"}}>Something went wrong. Your data was not saved. Please, try again.</p>}
        </div>
      </div>
      <input type="submit" className={`btn-sm btn-primary ${profileFilled ? '' : 'disabled'}`} value="Save" disabled={!profileFilled} />
    </form>
  );
}

export default ProfileForm;
