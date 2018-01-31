class AuthApi {

  static loginUser(username, password) {

    return fetch('/login', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({username, password})
    });
  }

  static signupUser(user) {

    return fetch('/signup', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(user)
    });
  }

  static logoutUser() {

    return fetch('/logout', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    });
  }
}

export default AuthApi;
