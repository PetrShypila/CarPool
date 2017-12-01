import React from 'react';
import PropTypes from 'prop-types';

import { Marker, InfoWindow } from "react-google-maps";

class MarkerWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      infoBoxVisible: false
    };

    this.setState = this.setState.bind(this);
    this.getState = this.getState.bind(this);
  }

  getState(){
    return this.state;
  }

  render() {
    return <Marker key={this.props.marker.id}
                   position={this.props.marker}
                   defaultIcon={{
                     url: this.props.marker.icon,
                     scaledSize: {height: 64, width: 64}
                   }}
                   onClick={() => {this.setState({infoBoxVisible: !this.getState().infoBoxVisible});}}
    >
      {this.state.infoBoxVisible &&
      <InfoWindow>
        <div>Hello World!</div>
      </InfoWindow>
      }
    </Marker>;
  }
}
MarkerWrapper.propTypes = {
  marker: PropTypes.object.isRequired
};

export default MarkerWrapper;
