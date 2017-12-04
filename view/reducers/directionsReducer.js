import * as ACTIONS from '../actions/actionTypes';
import initialState from './initialState';

export default function directionsReducer(state = initialState.directions, action){
  switch (action.type) {

    case ACTIONS.BUILD_DIRECTION:
      return action.directions;

    default:
      return state;

  }
}
