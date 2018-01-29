import * as ACTIONS from '../actions/actionTypes';
import initialState from './initialState';

export default function usersReducer(state = initialState.users, action){
  switch (action.type) {

    case ACTIONS.USERS_LOAD_SUCCESS:
      return action.users;

    default:
      return state;
  }
}
