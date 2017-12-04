import {combineReducers} from 'redux';

import markers from './markersReducer';
import directions from './directionsReducer';

const rootReducer = combineReducers({
  markers, directions
});

export default rootReducer;
