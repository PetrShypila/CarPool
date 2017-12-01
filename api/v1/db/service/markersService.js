import Marker from '../models/markersModels';

const markerIcons = {
  user: "http://www.myiconfinder.com/uploads/iconsets/256-256-76f453c62108782f0cad9bfc2da1ae9d.png",
  company: "http://www.myiconfinder.com/uploads/iconsets/256-256-a5485b563efc4511e0cd8bd04ad0fe9e.png"
};

export function getMarkers() {

  return new Promise((resolve, reject) => {
    Marker.find().then(markers => {
      const markersData = markers.map(m => {
        const marker = Object.assign({}, m.coordinates);

        marker.icon = markerIcons[m.type];
        marker.id = m._id;

        return marker;
      });

      resolve(markersData);
    });
  });
}
