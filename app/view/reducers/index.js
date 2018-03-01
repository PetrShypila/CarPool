import {combineReducers} from 'redux';

import markers from './markersReducer';
import users from './usersReducer';
import directions from './directionsReducer';
import activeUser from './activeUserReducer';
import connections from './connectionsReducer';

const rootReducer = combineReducers({
  markers, users, directions, activeUser, connections
});

export default rootReducer;
