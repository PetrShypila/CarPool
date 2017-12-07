import Marker from '../models/markersModels';

const markerIcons = {
  company: "http://www.myiconfinder.com/uploads/iconsets/256-256-a5485b563efc4511e0cd8bd04ad0fe9e.png",
  driver: "https://d30y9cdsu7xlg0.cloudfront.net/png/5551-200.png",
  user: "http://www.myiconfinder.com/uploads/iconsets/256-256-76f453c62108782f0cad9bfc2da1ae9d.png",
  user_driver: "http://www.pvhc.net/img44/adavohjvtkmaaewhudrj.png"
};

export function getMarkers() {

  return new Promise((resolve, reject) => {
    Marker.find({}).then(markers => {
      const markersData = markers.map(m => {
        const marker = Object.assign({}, m._doc);

        marker.icon = markerIcons[marker.type];

        return marker;
      });

      resolve(markersData);
    });
  });
}
