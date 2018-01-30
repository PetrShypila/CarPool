import * as ACTIONS from "./actionTypes";
import AuthApi from '../api/AuthApi';

export function loginUser(username, password) {
  AuthApi.loginUser(username, password);
}

export function signupUser(user) {
  AuthApi.signupUser(user);
}

export function logoutUser() {

  AuthApi.logoutUser();

  return {type: ACTIONS.USER_ACTIVE_LOGOUT};
}
