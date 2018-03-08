import React from 'react';
import * as authActions from '../../actions/authActions';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class SignUp extends React.Component {
  static propTypes = {
    actions : PropTypes.shape({
      signupUser: PropTypes.func.isRequired
    }),
  };

  state = {
    email:'',
    username:'',
    phone:'',
    firstname:'',
    lastname:'',
    password:''
  };

  submitCreds = (event) => {
    event.preventDefault();
    const { username, password, firstname, lastname, phone } = this.state;

    this.props.actions.signupUser({ username, password, firstname, lastname, phone });
  };

  updateValue = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    return (
      <form onSubmit={this.submitCreds}>
        <div className="container">
          <label><b>Username:</b></label>
          <input type="text" name="username" value={this.state.username} onChange={this.updateValue} />
          <label><b>Password:</b></label>
          <input type="password" name="password" value={this.state.password} onChange={this.updateValue} />
          <label><b>First Name:</b></label>
          <input type="text" name="firstname" value={this.state.firstname} onChange={this.updateValue} />
          <label><b>Last name:</b></label>
          <input type="text" name="lastname" value={this.state.lastname} onChange={this.updateValue} />
          <label><b>Phone Number:</b></label>
          <input type="text" name="phone" value={this.state.phone} onChange={this.updateValue} />
          <input type="submit" className="login-btn" value="Submit" />
        </div>
      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, authActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
