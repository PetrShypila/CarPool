import * as ACTIONS from '../actions/actionTypes';
import MarkersApi from '../api/MarkersApi';

export function showMarkerInfoBox(markerId) {
  return {type: ACTIONS.MARKER_SHOW_INFOBOX, markerId};
}

export function loadMarkers() {

  return function (dispatch) {

    return MarkersApi.getAllMarkers().then(courses => {
      dispatch(loadMarkersSuccess(courses));
    }).catch(error => {
      throw(error);
    });

  };
}

function loadMarkersSuccess(markers) {
  return { type: ACTIONS.MARKERS_LOAD_SUCCESS, markers };
}
