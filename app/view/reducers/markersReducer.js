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

    case ACTIONS.MARKERS_UPDATE_FOR_USERNAME: {
      const {markers, username} = action;
      markers.forEach(m => {m.username = username;});

      const filteredMarkers = state.filter(marker => {
        return marker.username !== username;
      });

      return filteredMarkers.concat(markers);
    }

    case ACTIONS.PROFILE_UPDATE_SUCCESS: {
      if(action.user && action.markers) {
        const {markers, user} = action;
        markers.forEach(m => {m.username = user.username;});

        const filteredMarkers = state.filter(marker => {
          return marker.username !== user.username;
        });

        return filteredMarkers.concat(markers);
      } else {
        return state;
      }
    }

    default:
      return state;

  }
}
