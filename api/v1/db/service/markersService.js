import Marker from '../models/markersModels';

export function getMarkers() {
  return new Promise((resolve, reject) => {
    Marker.find({}).then(markers => {
      resolve(markers);
    });
  });
}
