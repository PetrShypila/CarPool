import {CONNECTION_STATUS_ACTIVE, CONNECTION_STATUS_NEW} from "../store/constants";

class ConnectionsApi {

  static createNewConnection(receiver, service, markerId) {
    return fetch('/api/v1/connection', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({receiver, service, markerId})
    });
  }

  static updateConnection(connectionId, propsForUpdate) {
    return fetch(`/api/v1/connection/${connectionId}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(propsForUpdate)
    });
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
