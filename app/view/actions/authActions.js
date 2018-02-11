import * as ACTIONS from "./actionTypes";
import AuthApi from '../api/AuthApi';

export function loginUser(username, password) {
  return () => (
    AuthApi.loginUser(username, password).then(res => {
      if(res.status === 200) {
        window.location.replace(res.url);
      }

      return res;
    })
  );
}

function loginUserSuccess() {
  return { type: ACTIONS.USER_ACTIVE_LOGIN };
}

export function signUpUser(user) {
  return () => (
    AuthApi.signUpUser(user).then(res => {
      if(res.status === 200) {
        window.location.replace(res.url);
      }
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
        //dispatch(logoutUserSuccess());
        window.location.replace(res.url);
      }
    }).catch(err => {
      throw(err);
    })
  );
}

function logoutUserSuccess() {
  return {type: ACTIONS.USER_ACTIVE_LOGOUT};
}
