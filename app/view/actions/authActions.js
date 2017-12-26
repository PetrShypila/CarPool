import AuthApi from '../api/AuthApi';

export function loginUser(username, password) {
  AuthApi.loginUser(username, password);
}

export function signupUser(user) {
  AuthApi.signupUser(user);
}
