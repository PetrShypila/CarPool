import * as ACTIONS from '../actions/actionTypes';
import initialState from './initialState';

export default function activeUserReducer(state = initialState.connections, action){
  switch (action.type) {

    case ACTIONS.CONNECTIONS_LOAD_SUCCESS: {
      return action.connections;
    }

    case ACTIONS.CONNECTIONS_ADD_NEW: {
      const updatedConnections = state.slice();
      updatedConnections.push(action.connection);

      return updatedConnections;
    }

    case ACTIONS.CONNECTIONS_DELETE_ONE: {
      return state.filter(s => s._id !== action.connectionId);
    }

    default: {
      return state;
    }
  }
}
