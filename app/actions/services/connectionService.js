import Connection from '../models/connection';
import logger from '../../logging';
import {CONNECTION_STATUS_NEW} from "../../view/store/constants";

class ConnectionService {

  static createConnection(req, res) {
    logger.debug(`Received body for new connection. Active user ${req.session.user.username}. Body: ${req.body}`);
    req.body.requester = req.session.user.username;
    req.body.datetime_created = Date.now();
    req.body.status = CONNECTION_STATUS_NEW;

    const createdConnection = new Connection(req.body);

    createdConnection.save().then(saved => {
      logger.info(`Connection ${JSON.stringify(saved)} saved`);
    }).catch(err => {
      logger.error(`Connection ${JSON.stringify(createdConnection)} has not been saved. Error ${err.message}`);
    });

    res.json(createdConnection);
  }

  static getConnections(req, res) {
    logger.debug(`Received params to gather existing connections.`);

    Connection.find(Object.assign({}, req.query)).then(connections => {
      logger.debug(`${connections.length} connection received`);
      res.json(connections);
    }).catch(err => {
      logger.error(`Error retreiving list of connections: ${err.message}`);
      res.status(500).end();
    });

  }
}



export default ConnectionService;
