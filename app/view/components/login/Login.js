import React from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import * as authActions from '../../actions/authActions';
import {connect} from "react-redux";

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
    event.preventDefault();
    this.props.actions.loginUser(this.state.username, this.state.password).then(res => {
      this.setState({loginStatus: res.status});
    });
  }

  updateValue(event) {
    this.setState({[event.target.name]: event.target.value, loginStatus: 0});
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.submitCreds}>
        <div className="container">
          <label><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="username" value={this.state.username} onChange={this.updateValue} required />

          <label><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.updateValue} required />
          {this.state.loginStatus >= 400 && this.state.loginStatus < 500 && <p style={{color: "red"}}>You provided incorrect credentials</p>}
          <button type="submit" className="login-btn">Login</button>
        </div>
      </form>
    );
  }
}


Login.propTypes = {
  actions : PropTypes.shape({
    loginUser: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
