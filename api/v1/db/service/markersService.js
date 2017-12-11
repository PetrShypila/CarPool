import Marker from '../models/markers';

export function getMarkers() {
  return new Promise((resolve, reject) => {
    Marker.find({}).then(markers => {
      resolve(markers);
    });
  });
}
