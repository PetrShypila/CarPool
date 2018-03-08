import * as ACTIONS from '../actions/actionTypes';
import MarkersApi from '../api/MarkersApi';

export function toggleMarkerInfoBox(markerId) {
  return {type: ACTIONS.MARKER_TOGGLE_INFOBOX, markerId};
}

export function showMarkerInfoBox(markerId) {
  return {type: ACTIONS.MARKER_SHOW_INFOBOX, markerId};
}

export function hideMarkerInfoBox(markerId) {
  return {type: ACTIONS.MARKER_HIDE_INFOBOX, markerId};
}

export function hideAllInfoBoxes() {
  return {type: ACTIONS.MARKER_HIDE_INFOBOXES};
}

export function addToMap(markerType, activeUsername) {
  return {type:ACTIONS.MARKERS_ADD_TO_MAP, markerType, activeUsername};
}

export function hideFromMap(markerType, activeUsername) {
  return {type:ACTIONS.MARKERS_HIDE_FROM_MAP, markerType, activeUsername};
}

export function loadMarkers() {

  return function (dispatch) {

    return MarkersApi.getAllMarkers().then(markers => {
      dispatch(loadMarkersSuccess(markers));
    }).catch(error => {
      throw(error);
    });

  };
}

function loadMarkersSuccess(markers) {
  return { type: ACTIONS.MARKERS_LOAD_SUCCESS, markers };
}
