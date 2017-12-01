import React from 'react';
import PropTypes from 'prop-types';
import MarkerWrapper from './MarkerWrapper';

const MarkerList = (props) => (
  <div>
    {props.markers.map(marker => {
        return <MarkerWrapper key={marker.id} marker={marker} />;
      }
    )}
  </div>
);

MarkerList.propTypes = {
  markers: PropTypes.array.isRequired
};

export default MarkerList;
