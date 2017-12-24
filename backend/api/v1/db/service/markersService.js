import Marker from '../models/markers';

export function sendMarkers(req, res) {
  Marker.find({}).then(markers => {
      res.json(markers);
  });
}
