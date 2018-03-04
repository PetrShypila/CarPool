import * as ACTIONS from '../actions/actionTypes';
import initialState from './initialState';
import {CONNECTION_STATUS_ACTIVE, CONNECTION_STATUS_NEW} from "../store/constants";

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

    case ACTIONS.CONNECTIONS_UPDATE_ONE: {
      const filteredConnections = state.filter(s => s._id !== action.connection._id);

      if([CONNECTION_STATUS_NEW, CONNECTION_STATUS_ACTIVE].includes(action.connection.status)) {
        filteredConnections.push(action.connection);
      }

      return filteredConnections;
    }

    default: {
      return state;
    }
  }
}
