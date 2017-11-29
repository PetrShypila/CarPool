import Marker from '../models/markersModels';

export function getMarkers() {
  return Marker.find();
}
