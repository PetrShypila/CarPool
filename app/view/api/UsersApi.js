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
    });
  }

  static updateProfile(profile) {

    return fetch('/api/v1/updateProfile', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile),
      credentials: 'same-origin'
    }).then(response => {
      return response.json();
    });
  }
}

export default UsersApi;
