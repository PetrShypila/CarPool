import * as ACTIONS from '../actions/actionTypes';

/* eslint-disable no-undef */

export function buildRouteToHost(direction) {
  const DirectionsService = new google.maps.DirectionsService();

  return (dispatch) => {

    DirectionsService.route({
      origin: new google.maps.LatLng(direction.origin.lat, direction.origin.lng),
      destination: new google.maps.LatLng(direction.destination.lat, direction.destination.lng),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        dispatch(typeShowMarkerInfoBox(result));
      } else {
        dispatch(typeShowMarkerInfoBox(null));
      }
    });
  };
}

export function cleanRoutes() {
  return {type: ACTIONS.DIRECTIONS_CLEAR, directions:null};
}

function typeShowMarkerInfoBox(directions) {
  return {type: ACTIONS.DIRECTION_BUILD, directions};
}
