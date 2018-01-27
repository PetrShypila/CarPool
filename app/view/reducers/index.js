import {combineReducers} from 'redux';

import markers from './markersReducer';
import users from './usersReducer';
import directions from './directionsReducer';
import activeUser from './activeUserReducer';

const rootReducer = combineReducers({
  markers, users, directions, activeUser
});

export default rootReducer;
