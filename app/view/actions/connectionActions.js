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

export function cancelConnection(_id) {

}

export function stopConnection(_id) {

}

function loadConnectionsSuccess(connections) {
  return {type: ACTIONS.CONNECTIONS_LOAD_SUCCESS, connections}
}

function addNewConnection(connection) {
  return {type: ACTIONS.CONNECTIONS_ADD_NEW, connection};
}
