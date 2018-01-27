class UsersApi {

  static getAllUsers() {
    return fetch('/api/v1/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
    }).then(response => {
        return response.json();
    }).catch(err => {
      throw(err);
    });
  }

  static getActiveUser() {
    return fetch('/api/v1/activeUser', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
    }).then(response => {
      return response.json();
    }).catch(err => {
      throw(err);
    });
  }
}

export default UsersApi;
