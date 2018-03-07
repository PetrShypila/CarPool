import * as React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as markerActions from "../../actions/markersActions";
import * as connectionActions from "../../actions/connectionActions";
import UserInfoBox from "./UserInfoBox";



class InboxRequest extends React.Component {
  static propTypes = {
    connection : PropTypes.object.isRequired,
    activeUsername : PropTypes.string.isRequired,
    user : PropTypes.object.isRequired,
    marker : PropTypes.object.isRequired,
    onAccept : PropTypes.func,
    onDecline : PropTypes.func,
    actions : PropTypes.shape({
      getConnections: PropTypes.func.isRequired,
      updateConnection: PropTypes.func.isRequired,
      createConnection: PropTypes.func.isRequired,
      hideMarkerInfoBox: PropTypes.func.isRequired,
      showMarkerInfoBox: PropTypes.func.isRequired
    }),
  };

  state = {
    hover: false,
    requestClicked: false
  };

  onDivOver = () => {
    this.setState({hover: true});

    const {marker} = this.props;
    this.props.actions.showMarkerInfoBox(marker._id);
  };

  onDivOut = () => {
    this.setState({hover: false});

    if(!this.state.requestClicked) {
      const {marker} = this.props;
      this.props.actions.hideMarkerInfoBox(marker._id);
    }
  };

  onDivClicked = () => {
    this.setState({requestClicked: true});

    const {marker} = this.props;
    this.props.actions.showMarkerInfoBox(marker._id);
  };

  render() {
    if(this.props.marker) console.log(`INBOX: ${JSON.stringify(this.props.marker)}`);
    return (
      <div style={this.state.hover ?
                    {backgroundColor: '#cecece', cursor: 'pointer'} :
                    {backgroundColor: '#ffffff', cursor: 'default'}}
           onMouseOver={this.onDivOver}
           onMouseOut={this.onDivOut}
           onClick={this.onDivClicked} >

        <UserInfoBox
          showDetails={false}
          user={this.props.user}
          serviceType={this.props.marker.type}
          connection={this.props.connection}
          activeUsername={this.props.activeUsername}
          showButton />

      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, markerActions, connectionActions), dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(InboxRequest);
