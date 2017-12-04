import * as ACTIONS from '../actions/actionTypes';
import initialState from './initialState';

export default function markersReducer(state = initialState.markers, action){
  switch (action.type) {

    case ACTIONS.LOAD_MARKERS_SUCCESS:
      return action.markers;

    case ACTIONS.SHOW_MARKER_INFOBOX: {
      return state.map(m => {
        m.infoBoxVisible = m.id === action.markerId;
        return m;
      });
    }

    default:
      return state;

  }
}
