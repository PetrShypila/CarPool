import {combineReducers} from 'redux';

import markers from './markersReducer';
import users from './usersReducer';
import directions from './directionsReducer';

const rootReducer = combineReducers({
  markers, users, directions
});

export default rootReducer;
