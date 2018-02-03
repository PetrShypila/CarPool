import Marker from '../models/marker';
import logger from '../../logging';

function getMarkers(req, res) {
  Marker.find(Object.assign({}, req.query)).then(markers => {
    res.json(markers);
  });
}

function updateUserMarkers(req, res) {
  const username = res.locals.user.username;
  const newMarkers = [];

  Object.keys(req.body.types).forEach(type => {
    if(req.body.types[type]) {
      newMarkers.push({
        username,
        type,
        coordinates: req.body.latLng
      });
    }
  });

  Marker.remove({ username }, function (err) {
    if (err) {
      logger.error(`Marker for user ${username} has not been removed. Error ${err.message}`);
      res.status(500).end();
    } else {
      logger.info(`Markers for user ${username} were removed`);

      newMarkers.forEach(m => {

        const marker = new Marker(m);

        marker.save().then(saved => {
          logger.info(`Marker ${JSON.stringify(saved)} saved`);
        }).catch(err => {
          logger.error(`Marker ${JSON.stringify(marker)} has not been saved. Error ${err.message}`);
        });
      });
      res.json({
        user: res.locals.user,
        markers: newMarkers
      });
    }
  });
}

export default {
  getMarkers,
  updateUserMarkers
};
