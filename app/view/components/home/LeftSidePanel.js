import * as React from "react";
import FilterInput from "../common/FilterInput";
import * as Constants from "../../store/constants";
import PropTypes from "prop-types";
import InboxRequest from "./InboxRequest";


class LeftSidePanel extends React.Component{

  static propTypes = {
    activeUsername: PropTypes.string.isRequired,
    users : PropTypes.array.isRequired,
    markers : PropTypes.array.isRequired,
    connections : PropTypes.array.isRequired,
    types : PropTypes.object.isRequired,
    onFilterClick : PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="left-panel">
        <div className="filters">
          <FilterInput name={"types-filter"}
                       label={"Show passengers"}
                       value={Constants.TYPE_PASSENGER}
                       checked={this.props.types[Constants.TYPE_PASSENGER]}
                       onChange={this.props.onFilterClick}
                       imageUrl={Constants.ICON_PASSENGER}
          />
          <FilterInput name={"types-filter"}
                       label={"Show drivers"}
                       value={Constants.TYPE_DRIVER}
                       checked={this.props.types[Constants.TYPE_DRIVER]}
                       onChange={this.props.onFilterClick}
                       imageUrl={Constants.ICON_DRIVER}
          />
        </div>
        <div className={`inbox`}>
          <p>Connections</p>
          {this.props.connections.map(c => (<InboxRequest key={c._id}
                                               connection={c}
                                               marker={this.props.markers.find(m => m._id === c.markerId)}
                                               user={this.props.users.find(u => u.username === c.requester)}
                                               activeUsername={this.props.activeUsername} />))}
        </div>
      </div>
    );
  }
}

export default LeftSidePanel;
