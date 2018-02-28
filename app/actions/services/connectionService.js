import Connection from '../models/connection';
import logger from '../../logging';

function createConnection(req, res) {
  debugger;
  logger.debug(`Received body for new connection. Active user ${req.session.user.username}. Body: ${req.body}`);
  req.body.requester = req.session.user.username;
  req.body.datetime_created = Date.now();
  req.body.state = 'new';

  const createdConnection = new Connection(req.body);

  createdConnection.save().then(saved => {
    logger.info(`Connection ${JSON.stringify(saved)} saved`);
  }).catch(err => {
    logger.error(`Connection ${JSON.stringify(createdConnection)} has not been saved. Error ${err.message}`);
  });

  res.json(createdConnection);
}

export default {
  createConnection
};
