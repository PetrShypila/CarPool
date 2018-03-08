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

export function signupUser(user) {
  return () => (
    AuthApi.signupUser(user).then(res => {
      if(res.status === 200) {
        window.location.replace(res.url);
      }
    })
  );
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
