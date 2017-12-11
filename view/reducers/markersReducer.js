import * as ACTIONS from '../actions/actionTypes';
import initialState from './initialState';

export default function markersReducer(state = initialState.markers, action){
  switch (action.type) {

    case ACTIONS.MARKERS_LOAD_SUCCESS:
      action.markers.forEach(m => m.visible = true);
      return action.markers;

    case ACTIONS.MARKER_HIDE_INFOBOXES:
      return state.map(m => {

        let marker = Object.assign({}, m);
        marker.infoBoxVisible = false;

        return marker;
      });

    case ACTIONS.MARKER_SHOW_INFOBOX: {
      return state.map(m => {

        let marker = Object.assign({}, m);

        if(marker._id === action.markerId) marker.infoBoxVisible = !marker.infoBoxVisible;

        return marker;
      });
    }

    case ACTIONS.MARKERS_FILTER: {
      return state.map(m => {

        let marker = Object.assign({}, m);
        marker.visible = marker.type === action.markerType;

        return marker;
      });
    }

    default:
      return state;

  }
}
