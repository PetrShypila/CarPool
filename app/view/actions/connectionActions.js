import * as ACTIONS from "./actionTypes";
import ConnectionsApi from "../api/ConnectionsApi";

export function getConnections() {
  return (dispatch) => (
    ConnectionsApi.getConnections().then(res => {
      return res.json();
    }).then(connections => {
      dispatch(loadConnectionsSuccess(connections));
    }).catch(err => {
      throw(err);
    })
  );
}

export function createConnection(receiver, service) {
  return (dispatch) => (
    ConnectionsApi.createNewConnection(receiver, service).then(res => {
      return res.json();
    }).then(connection => {
      dispatch(addNewConnection(connection));
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
      dispatch(deleteConnection(connection._id));
    }).catch(err => {
      throw(err);
    })
  );
}

function loadConnectionsSuccess(connections) {
  return {type: ACTIONS.CONNECTIONS_LOAD_SUCCESS, connections};
}

function deleteConnection(connectionId) {
  return {type: ACTIONS.CONNECTIONS_DELETE_ONE, connectionId};
}

function addNewConnection(connection) {
  return {type: ACTIONS.CONNECTIONS_ADD_NEW, connection};
}
