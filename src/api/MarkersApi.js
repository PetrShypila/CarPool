import delay from './delay';

const markers = [
  { id:1, lat: 50.0502958, lng: 19.9384682 },
  { id:2, lat: 50.0602958, lng: 19.9384682 },
  { id:3, lat: 50.0602958, lng: 19.9284682 }
];

class MarkersApi {

  static getAllMarkers() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], markers));
      }, delay);
    });
  }
}

export default MarkersApi;
