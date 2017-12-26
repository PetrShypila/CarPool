import Marker from '../models/markers';

function getMarkers(req, res) {
  Marker.find(Object.assign({}, req.query)).then(markers => {
    res.json(markers);
  });
}

export default {
  getMarkers
};
