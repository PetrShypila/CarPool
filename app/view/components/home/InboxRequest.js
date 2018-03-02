import * as React from "react";
import * as Constants from "../../store/constants";
import PropTypes from "prop-types";
import Button from "../common/Button";



class InboxRequest extends React.Component {
  static propTypes = {
    connection : PropTypes.object.isRequired,
    user : PropTypes.object.isRequired,
    onAccept : PropTypes.func,
    onDecline : PropTypes.func
  };

  state = {
    hover: false
  };

  onDivOver = () => {
    this.setState({hover: true});
  };

  onDivOut = () => {
    this.setState({hover: false});
  };

  render() {
    const {user} = this.props;
    return (
      <div style={this.state.hover ?
                    {backgroundColor: '#cecece', cursor: 'pointer'} :
                    {backgroundColor: '#ffffff', cursor: 'default'}}
           onMouseOver={this.onDivOver}
           onMouseOut={this.onDivOut}>

        <div className="user-info-box">
          <img src={user.pic} className="user-pic-small" />
          <div className="user-info">
            <div><b>{`${user.firstname} ${user.lastname}`}</b></div>
            <Button text={"V"} onClick={this.props.onAccept}/>
            <Button text={"X"} onClick={this.props.onDecline}/>
          </div>
        </div>

      </div>
    );
  }
}

export default InboxRequest;
