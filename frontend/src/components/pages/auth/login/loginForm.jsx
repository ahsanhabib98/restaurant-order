import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../../../store/actions/authAction";

class LoginForm extends Component {
  state = {
    error: {},
  };

  componentDidMount() {
      if (window.location.host.split(".")[0] !== 'dashboard') {
          window.location.href = window.location.href + "delivery"
      }
  }

    static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.login_auth.error) !==
      JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.login_auth.error,
      };
    }
    return null;
  }

  render() {
    const { error } = this.state;
    const { pathname } = this.props;
    const location = window.location.host.split(".")[0];

    return (
      <form className="loginForm" onSubmit={this.props.submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            className={
              error && error.email ? "form-control is-invalid" : "form-control"
            }
            name="email"
            id="email"
            onChange={this.props.changeHandler}
            value={this.props.email}
            placeholder="Enter Email"
          />
          {error && error.email && (
            <div className="invalid-feedback">{error.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <Link to="/password-reset" className="forgot-password"></Link>

          <Link to="/password-reset" className="forgot-password">
            Forgot Password?
          </Link>
          <input
            type="password"
            className={
              error && error.password
                ? "form-control is-invalid"
                : "form-control"
            }
            name="password"
            id="password"
            onChange={this.props.changeHandler}
            value={this.props.password}
            placeholder="*****************"
          />
          {error && error.password && (
            <div className="invalid-feedback">{error.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block btn-sm login_btn"
        >
          Log In
        </button>
        {pathname !== "superuser" ? (
          <p className="mt-3">
            <span className="mr-2">Don’t have an account?</span>
            {location !== "dashboard" ? (
              <Link to="/user-registration" className="font-weight-bold">
                Sign Up
              </Link>
            ) : (
              <Link to="/registration" className="font-weight-bold">
                Sign Up
              </Link>
            )}
          </p>
        ) : null}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  login_auth: state.login_auth,
});

export default connect(mapStateToProps, { login })(LoginForm);
