import * as ACTIONS from "./actionTypes";
import AuthApi from '../api/AuthApi';

export function loginUser(username, password) {
  return dispatch => (
    AuthApi.loginUser(username, password).then(res => {
      if(res.status === 200) {
        dispatch(loginUserSuccess());
        window.location.replace(res.url);
      }
    }).catch(err => {
      console.log(`Error on user login: ${err.message}`);
      throw(err);
    })
  );
}

function loginUserSuccess() {
  return { type: ACTIONS.USER_ACTIVE_LOGIN };
}

export function signUpUser(user) {
  return dispatch => (
    AuthApi.signUpUser(user).then(res => {
      if(res.status === 200) {
        dispatch(signUpUserSuccess());
        window.location.replace(res.url);
      }
    }).catch(err => {
      console.log(`Error on user signup: ${err.message}`);
      throw(err);
    })
  );
}

function signUpUserSuccess() {
  return { type: ACTIONS.USER_ACTIVE_SIGNUP };
}

export function logoutUser() {

  return dispatch => (
    AuthApi.logoutUser().then(res => {
      if(res.status === 200) {
        dispatch(logoutUserSuccess());
        window.location.replace(res.url);
      }
    }).catch(err => {
      console.log(`Error on user logout: ${err.message}`);
      throw(err);
    })
  );
}

function logoutUserSuccess() {
  return {type: ACTIONS.USER_ACTIVE_LOGOUT};
}
