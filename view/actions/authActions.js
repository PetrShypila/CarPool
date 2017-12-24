import AuthApi from '../api/AuthApi';

export function loginUser(username, password) {
  AuthApi.authenticateUser(username, password);
}
