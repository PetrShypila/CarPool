import * as ACTIONS from '../actions/actionTypes';
import initialState from './initialState';

export default function activeUserReducer(state = initialState.activeUser, action){
  switch (action.type) {

    case ACTIONS.ACTIVE_USER_LOADED:
      return action.activeUser;

    default:
      return state;
  }
}
