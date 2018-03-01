import * as ACTIONS from '../actions/actionTypes';
import initialState from './initialState';

export default function activeUserReducer(state = initialState.connections, action){
  switch (action.type) {

    case ACTIONS.CONNECTIONS_LOAD_SUCCESS:
      return action.connections;

    case ACTIONS.CONNECTIONS_ADD_NEW:
      const updatedConnections = state.slice();
      updatedConnections.push(action.connection);

      return updatedConnections;

    default:
      return state;
  }
}
