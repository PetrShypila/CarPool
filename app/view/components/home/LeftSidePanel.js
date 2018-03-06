import * as React from "react";
import FilterInput from "../common/FilterInput";
import * as Constants from "../../store/constants";
import PropTypes from "prop-types";
import InboxRequest from "./InboxRequest";

LeftSidePanel.propTypes = {
  activeUsername: PropTypes.string.isRequired,
  users : PropTypes.array.isRequired,
  markers : PropTypes.array.isRequired,
  connections : PropTypes.array.isRequired,
  types : PropTypes.object.isRequired,
  onFilterClick : PropTypes.func.isRequired
};

function LeftSidePanel({onFilterClick, types, users, markers, connections, activeUsername}) {
  return (
    <div className="left-panel">
      <div className="filters">
        <FilterInput name={"types-filter"}
                     label={"Show passengers"}
                     value={Constants.TYPE_PASSENGER}
                     checked={types[Constants.TYPE_PASSENGER]}
                     onChange={onFilterClick}
                     imageUrl={Constants.ICON_PASSENGER}
        />
        <FilterInput name={"types-filter"}
                     label={"Show drivers"}
                     value={Constants.TYPE_DRIVER}
                     checked={types[Constants.TYPE_DRIVER]}
                     onChange={onFilterClick}
                     imageUrl={Constants.ICON_DRIVER}
        />
      </div>
      <div className={`inbox`}>
        <p>Connections</p>
        {connections.map(c => (<InboxRequest key={c._id}
                                             connection={c}
                                             marker={markers.find(m => m.username === c.requester)}
                                             user={users.find(u => u.username === c.requester)}
                                             activeUsername={activeUsername} />))}
      </div>
    </div>
  );
}

export default LeftSidePanel;
