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
    }).then(res => {
        if(res.status === 200) {
          window.location.replace(res.url);
        }
      })
      .catch(err => {
        throw(err);
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
    }).then(res => {
      if(res.status === 200) {
        window.location.replace(res.url);
      }
    })
    .catch(err => {
      throw(err);
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
    }).then(res => {
      if(res.status === 200) {
        window.location.replace(res.url);
      }
    })
      .catch(err => {
        throw(err);
      });
  }
}

export default AuthApi;
