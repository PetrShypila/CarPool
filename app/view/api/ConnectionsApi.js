import {CONNECTION_STATUS_ACTIVE, CONNECTION_STATUS_NEW} from "../store/constants";

class ConnectionsApi {

  static createNewConnection(receiver, service) {
    return fetch('/api/v1/createConnection', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({receiver, service})
    });
  }

  static cancelConnection(_id) {

  }

  static stopConnection(_id) {

  }

  static getConnections() {
    return fetch(`/api/v1/connections?status=${CONNECTION_STATUS_NEW}&status=${CONNECTION_STATUS_ACTIVE}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    });
  }
}

export default ConnectionsApi;
