import React from 'react';
import * as authActions from '../../actions/authActions';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

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
    const { username, password, firstname, lastname, phone } = this.state;

    this.props.actions.signupUser({ username, password, firstname, lastname, phone });
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

SignUp.propTypes = {
  actions : PropTypes.shape({
    signupUser: PropTypes.func.isRequired
  }),
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, authActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
