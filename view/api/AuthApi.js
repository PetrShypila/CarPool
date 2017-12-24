class AuthApi {

  static authenticateUser(username, password) {

    return fetch('/authenticate', {
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
}

export default AuthApi;
