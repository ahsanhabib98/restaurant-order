import React, { Component } from "react";
import ClientFeedback from "../login/ClientFeedback";
import ReegisterIntro from "./RegisterIntro";
import Signup from "./Signup";

class Registration extends Component {
  render() {
    return (
      <div className="login container-flui">
        <div className="ro login_page align-items-center">
          <div className="client_feedback_bg text-light  d-none d-lg-block">
            <ClientFeedback />
          </div>
          <div className="right-panel ">
            <div className="login_parent">
              <div className="login_warp">
                <ReegisterIntro />
              </div>
              <br />
              <Signup history={this.props.history} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
