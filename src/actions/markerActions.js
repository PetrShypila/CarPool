import * as ACTIONS from '../actions/actionTypes';
import MarkersApi from '../api/MarkersApi';

export function loadMarkersSuccess(markers) {
  return { type: ACTIONS.LOAD_MARKERS_SUCCESS, markers };
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
