import * as React from "react";
import FilterInput from "../common/FilterInput";
import * as Constants from "../../store/constants";
import PropTypes from "prop-types";

const LeftSidePanel = ({onFilterClick, types}) => (
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
      Here is your inbox
    </div>
    <div className="info">
      <span><b>Info section:</b></span>
      <br/>
      <br/>
      <div><p><img src={Constants.ICON_USER} width="32" height="32"/> - Your home</p></div>
      <div><p><img src={Constants.ICON_COMPANY} width="32" height="32"/> - Your office</p></div>
      <div><p><img src={Constants.ICON_PASSENGER} width="32" height="32"/> - Looking for a company to the office</p></div>
      <div><p><img src={Constants.ICON_DRIVER} width="32" height="32"/> - Willing to pick somebody to the office</p></div>
    </div>
  </div>
);

LeftSidePanel.propTypes = {
  types : PropTypes.object.isRequired,
  onFilterClick : PropTypes.func.isRequired
};

export default LeftSidePanel;
