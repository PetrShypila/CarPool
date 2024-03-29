import * as ACTIONS from '../actions/actionTypes';
import initialState from './initialState';

export default function activeUserReducer(state = initialState.activeUser, action){
  switch (action.type) {

    case ACTIONS.USER_ACTIVE_LOADED:
      return action.activeUser;

    case ACTIONS.PROFILE_UPDATE_SUCCESS:
      return action.user;

    default:
      return state;
  }
}
