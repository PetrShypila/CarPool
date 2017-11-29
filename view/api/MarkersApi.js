class MarkersApi {

  static getAllMarkers() {
    return fetch('/api/v1/markers')
      .then(response => {
        return response.json();
      })
      .catch(err => {
        throw(err);
      });
  }
}

export default MarkersApi;
