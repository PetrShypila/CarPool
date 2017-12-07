import * as ACTIONS from '../actions/actionTypes';
import initialState from './initialState';

export default function directionsReducer(state = initialState.directions, action){
  switch (action.type) {

    case ACTIONS.DIRECTION_BUILD:
      return action.directions;

    case ACTIONS.DIRECTIONS_CLEAR:
      return action.directions;

    default:
      return state;

  }
}
