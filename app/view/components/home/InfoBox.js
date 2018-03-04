import React from 'react';
import * as Constants from "../../store/constants";

function InfoBox() {
  return (
    <div className="info">
      <span><b>Info section:</b></span>
      <br/>
      <br/>
      <div><p><img src={Constants.ICON_USER} width="32" height="32"/> - Your home</p></div>
      <div><p><img src={Constants.ICON_COMPANY} width="32" height="32"/> - Your office</p></div>
      <div><p><img src={Constants.ICON_PASSENGER} width="32" height="32"/> - Looking for a company to the office</p></div>
      <div><p><img src={Constants.ICON_DRIVER} width="32" height="32"/> - Willing to pick somebody to the office</p></div>
    </div>
  );
}

export default InfoBox;
