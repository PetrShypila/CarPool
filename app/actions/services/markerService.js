import Marker from '../models/marker';
import logger from '../../logging';

function getMarkers(req, res) {
  Marker.find(Object.assign({}, req.query)).then(markers => {
    res.json(markers);
  });
}

function updateUserMarkers(req, res) {

  if(req.body.marker) {

    const username = res.locals.user.username;

    Marker.remove({ username }, function (err) {
      if (err) {
        logger.error(`Marker for user ${username} has not been removed. Error ${err.message}`);
        res.status(500).end();
      } else {
        logger.info(`Markers for user ${username} were removed`);


        const marker = new Marker(req.body.marker);

        marker.save().then(m => {
          logger.info(`Marker ${JSON.stringify(m)} saved`);

          return res.json({
            user: res.locals.user,
            markers: [m]
          });
        }).catch(err => {
          logger.error(`Marker ${JSON.stringify(marker)} has not been saved. Error ${err.message}`);
          return res.status(500).send({ error: err.message });
        });
      }
    });
  } else {
    return res.json({user: res.locals.user});
  }
}

export default {
  getMarkers,
  updateUserMarkers
};
