import UsersApi from "../api/UsersApi";
import * as ACTIONS from "./actionTypes";

export function loadUsers() {

  return function (dispatch) {

    return UsersApi.getAllUsers().then(users => {
      dispatch(loadUsersSuccess(users));
    }).catch(error => {
      throw(error);
    });

  };
}

export function loadActiveUser() {

  return function (dispatch) {

    return UsersApi.getActiveUser().then(user => {
      dispatch(loadActiveUserSuccess(user));
    }).catch(error => {
      throw(error);
    });

  };
}

function loadUsersSuccess(users) {
  return { type: ACTIONS.USERS_LOAD_SUCCESS, users };
}

function loadActiveUserSuccess(activeUser) {
  return { type: ACTIONS.USER_ACTIVE_LOADED, activeUser };
}
