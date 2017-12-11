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

    case ACTIONS.MARKERS_ADD_TO_MAP: {
      return state.map(m => {

        let marker = Object.assign({}, m);

        if(marker.type === action.markerType) {
          marker.visible = true;
        }

        return marker;
      });
    }

    case ACTIONS.MARKERS_HIDE_FROM_MAP: {
      return state.map(m => {

        let marker = Object.assign({}, m);

        if(marker.type === action.markerType) {
          marker.visible = false;
        }

        return marker;
      });
    }

    default:
      return state;

  }
}
