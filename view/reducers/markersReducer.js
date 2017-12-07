import * as ACTIONS from '../actions/actionTypes';
import initialState from './initialState';

export default function markersReducer(state = initialState.markers, action){
  switch (action.type) {

    case ACTIONS.MARKERS_LOAD_SUCCESS:
      return action.markers;

    case ACTIONS.MARKER_SHOW_INFOBOX: {
      return state.map(m => {

        let marker = Object.assign({}, m);
        marker.infoBoxVisible = marker._id === action.markerId;
        return marker;
      });
    }

    default:
      return state;

  }
}
