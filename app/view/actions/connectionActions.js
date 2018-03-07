import * as ACTIONS from "./actionTypes";
import ConnectionsApi from "../api/ConnectionsApi";
import * as Constants from "../store/constants";

export function getConnections() {
  return (dispatch) => (
    ConnectionsApi.getConnections().then(res => {
      return res.json();
    }).then(connections => {
      dispatch(typeLoadConnectionsSuccess(connections));
    }).catch(err => {
      throw(err);
    })
  );
}

export function createConnection(receiver, service, markerId) {
  return (dispatch) => (
    ConnectionsApi.createNewConnection(receiver, service,  markerId).then(res => {
      return res.json();
    }).then(connection => {
      dispatch(typeAddNewConnection(connection));
    }).catch(err => {
      throw(err);
    })
  );
}

export function updateConnection(connectionId, status) {
  return (dispatch) => (
    ConnectionsApi.updateConnection(connectionId, {status}).then(res => {
      return res.json();
    }).then(connection => {
      dispatch(typeUpdateConnection(connection));
    }).catch(err => {
      throw(err);
    })
  );
}

function typeLoadConnectionsSuccess(connections) {
  return {type: ACTIONS.CONNECTIONS_LOAD_SUCCESS, connections};
}

function typeUpdateConnection(connection) {
  return {type: ACTIONS.CONNECTIONS_UPDATE_ONE, connection};
}

function typeAddNewConnection(connection) {
  return {type: ACTIONS.CONNECTIONS_ADD_NEW, connection};
}
