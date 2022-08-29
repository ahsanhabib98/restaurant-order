import React, { Component } from "react";
import { connect } from "react-redux";
// import { passwordChangeURL } from "../../../constants";
import { passwordUpdateAction } from "../../../store/actions/passwordChangeAction";

export class ChangePassword extends Component {
  state = {
    old_password: "",
    password: "",
    password2: "",
  };

  onChagneHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    let { old_password, password, password2 } = this.state;
    this.props.passwordUpdateAction(this.props.user_id, {
      old_password,
      password,
      password2,
    });
    // console.log("Password has been changed");
  };

  render() {
    let { old_password, password, password2 } = this.state;
    return (
      <>
        <form onSubmit={this.submitHandler} className="mt-5">
          <h4>Security</h4>
          <div className="form-group">
            <label htmlFor="old_password">Current password *</label>
            <input
              type="password"
              id="Current_password"
              className="form-control"
              name="old_password"
              value={old_password}
              onChange={(e) => this.setState({ old_password: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New password *</label>
            <input
              type="password"
              id="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">New password *</label>
            <input
              type="password"
              id="password2"
              className="form-control"
              name="password2"
              value={password2}
              onChange={(e) => this.setState({ password2: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-md btn-secondary">
            Update password
          </button>
        </form>
      </>
    );
  }
}

export default connect(null, { passwordUpdateAction })(ChangePassword);
