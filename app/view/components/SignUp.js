import React from 'react';
import * as authActions from '../actions/authActions';

class SignUp extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      email:'',
      username:'',
      phone:'',
      firstname:'',
      lastname:'',
      password:''
    };

    this.submitCreds = this.submitCreds.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  submitCreds(event) {
    const user = {
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone
    };

    authActions.signupUser(user);
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
        <label>
          First Name:
          <input type="text" name="firstname" value={this.state.firstname} onChange={this.updateValue} />
        </label>
        <label>
          Last name:
          <input type="text" name="lastname" value={this.state.lastname} onChange={this.updateValue} />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phone" value={this.state.phone} onChange={this.updateValue} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SignUp;
