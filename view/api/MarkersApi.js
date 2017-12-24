class MarkersApi {

  static getAllMarkers() {
    return fetch('/api/v1/markers', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        throw(err);
      });
  }
}

export default MarkersApi;
