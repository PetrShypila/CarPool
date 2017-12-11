class UsersApi {

  static getAllUsers() {
    return fetch('/api/v1/users')
      .then(response => {
        return response.json();
      })
      .catch(err => {
        throw(err);
      });
  }
}

export default UsersApi;
