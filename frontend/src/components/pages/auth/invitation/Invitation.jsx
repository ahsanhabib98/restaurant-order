import React, { Component } from "react";
import CustomModal from "../../modal/CustomModal";
import ClientFeedback from "./../login/ClientFeedback";
import LoginIntro from "./../login/LoginIntro";
import { invitation } from "../../../../constants";

import axios from "axios";

class Invitation extends Component {
  state = {
    password: "",
    confirmPassword: "",
  };

  onchangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    const { token } = this.props.match.params;
    axios
      .post(`${invitation}/${token}/create_user/`, {
        password,
        confirm_password: confirmPassword,
      })
      .then(({ data }) => {
        this.props.history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { password, confirmPassword } = this.state;
    // console.log(pathname);

    return (
      <div className="login">
        <div className=" login_page align-items-center">
          <div className="client_feedback_bg text-light d-none d-lg-block">
            <ClientFeedback />
          </div>
          <div className="right-panel">
            <div className="login_parent">
              <div className="login_warp">
                <img
                  src={window.location.origin + "/logo.png"}
                  alt="onnow logo"
                  style={{ height: "50px" }}
                />
                <h3 className="mt-4">Invitation</h3>
              </div>
              <br />
              <form action="" onSubmit={this.submitHandler}>
                <div className="form-group">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onchangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onchangeHandler}
                  />
                </div>

                <button className="btn btn-primary btn-lg w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Invitation;
