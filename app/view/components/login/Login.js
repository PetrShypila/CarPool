import React from 'react';
import * as authActions from '../../actions/authActions';

class Login extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      username:'',
      password:''
    };

    this.submitCreds = this.submitCreds.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  submitCreds(event) {
    authActions.loginUser(this.state.username, this.state.password);
    event.preventDefault();
  }

  updateValue(event) {
    this.setState({[event.target.name]: event.target.value});
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.submitCreds}>
        <label>
          Username:
          <input type="text" name="username" value={this.state.username} onChange={this.updateValue} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={this.state.password} onChange={this.updateValue} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Login;
