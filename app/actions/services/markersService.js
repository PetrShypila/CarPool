import Marker from '../models/marker';
import logger from '../../logging';

function getMarkers(req, res) {
  Marker.find(Object.assign({}, req.query)).then(markers => {
    res.json(markers);
  });
}

function updateUserMarkers(req, res) {
  const {username} = req.session.user;

  Marker.remove({ username }, function (err) {
    if (err) {
      logger.error(`Marker for user ${username} has not been removed. Error ${err.message}`);
    } else {
      logger.info(`Markers for user ${username} were removed`);

      req.body.forEach(m => {
        m.username = username;
        const marker = new Marker(m);
        marker.save().then(saved => {
          logger.info(`Marker ${JSON.stringify(saved)} saved`);
        }).catch(err => {
          logger.error(`Marker ${JSON.stringify(marker)} has not been saved. Error ${err.message}`);
        });
      });
    }
  });

  logger.info(`New markers: ${JSON.stringify(req.body)}`);
  res.status(200).end();
}

export default {
  getMarkers,
  updateUserMarkers
};
