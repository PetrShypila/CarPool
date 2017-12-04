import * as ACTIONS from '../actions/actionTypes';
import MarkersApi from '../api/MarkersApi';

export function showMarkerInfoBox(markerId) {
  return {type: ACTIONS.SHOW_MARKER_INFOBOX, markerId};
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
  return { type: ACTIONS.LOAD_MARKERS_SUCCESS, markers };
}
