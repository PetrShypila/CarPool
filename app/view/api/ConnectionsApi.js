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
}

export default ConnectionsApi;
