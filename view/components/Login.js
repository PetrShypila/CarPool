import React from 'react';
import * as authActions from '../actions/authActions';

const USERNAME = 'username';
const PASSWORD = 'password';

class Login extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      username:'',
      password:''
    };

    this.submitCreds = this.submitCreds.bind(this);

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  submitCreds(event) {
    authActions.loginUser(this.state.username, this.state.password);
    event.preventDefault();
  }

  updateUsername(event) {
    this.updateState(USERNAME, event.target.value);
    event.preventDefault();
  }

  updatePassword(event) {
    this.updateState(PASSWORD, event.target.value);
    event.preventDefault();
  }

  updateState(stateKey, newValue) {
    this.setState({[stateKey]: newValue});
  }

  render() {
    return (
      <form onSubmit={this.submitCreds}>
        <label>
          Username:
          <input type="text" value={this.state.username} onChange={this.updateUsername} />
        </label>
        <label>
          Password:
          <input type="password" value={this.state.password} onChange={this.updatePassword} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Login;
