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

  static updateUserMarkers(markers) {

    return fetch('/api/v1/updateUserMarkers', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        markers
      ),
      credentials: 'same-origin',
    })
    .then(response => {
      return response.status;
    })
    .catch(err => {
      throw(err);
    });

  }
}

export default MarkersApi;
