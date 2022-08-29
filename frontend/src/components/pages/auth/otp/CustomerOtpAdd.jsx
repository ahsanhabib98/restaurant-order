import FeatherIcon from "feather-icons-react";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  accountUpdateURL,
  customerURL,
  otpCodeWiseUserURL,
  sendOtpCodeURL,
  smsGetWayURL,
  verifyUserURL,
} from "../../../../constants";
import axios from "axios";

// import OtpInput from "react-otp-input";

class CustomerOTPAdd extends Component {
  state = {
    otpCode: "",
    otp_code: {
      first: "",
      second: "",
      third: "",
      fourth: "",
      fifth: "",
    },
    customer: "",
    error: null,
  };

  componentDidMount() {
    const { customer } = this.props;
    this.setState({ customer: customer });
  }

  getOtpCode = () => {
    const { first, second, third, fourth, fifth } = this.state.otp_code;
    return first + second + third + fourth + fifth;
  };

  onSubmitHandler = () => {
    const { customer, otpCode } = this.state;
    // const otp_code = otpCode;
    const otp_code = this.getOtpCode();
    axios
      .get(`${customerURL}${customer.phone_number}/`)
      .then((res) => {
        if (otp_code === res.data.otp_code) {
          axios
            .put(`${customerURL}${customer.phone_number}/`, { is_verify: true })
            .then((res) => {
              this.setState({ customer: res.data });
              this.props.handleOTPVerify();
            })
            .catch((err) => {
              this.setState({ error: err });
            });
        } else {
          this.setState({ error: "Your otp-code is not correct" });
        }
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  };

  onChangeHandler = (e) => {
    this.setState(
      { otp_code: { ...this.state.otp_code, [e.target.name]: e.target.value } },
      function () {
        const obj = this.state.otp_code;
        let count = 0;
        if (Object.keys(this.state.otp_code).length === 5) {
          Object.keys(this.state.otp_code).forEach(function (key) {
            if (obj[key] !== "") {
              count++;
            }
          });
          if (count === 5) {
            this.onSubmitHandler();
          }
        }
      }
    );
  };

  // otpChangeHanlder = (otpCode) => {
  //   if (otpCode.length === 5) {
  //     this.onSubmitHandler();
  //   }

  //   this.setState({ otpCode });
  // };

  render() {
    // console.log("OTP NEW: ", this.state.otpCode);
    // console.log("OTP OLD: ", this.getOtpCode());

    return (
      <div className="otp_main pt-3 pl-3 pr-3">
        <FeatherIcon icon="arrow-left" size="25" />
        <h2>Verify your phone</h2>
        <p>
          We’ve sent you an SMS with the verification code to <br /> +88
          {this.state.customer.phone_number}
        </p>

        {/* <form
          action=""
          onSubmit={this.onSubmitHandler}
          className="otp-input-form"
        >
          <OtpInput
            value={this.state.otpCode}
            onChange={this.otpChangeHanlder}
            numInputs={5}
            separator={<span>-</span>}
          />
        </form> */}

        <form className="mt-3" onSubmit={this.onSubmitHandler.bind(this)}>
          <div className="otp_confirm">
            <div className="d-flex flex-row">
              <div className="mr-2">
                <input
                  type="text"
                  name="first"
                  value={this.state.otp_code.first}
                  onChange={this.onChangeHandler.bind(this)}
                  maxLength="1"
                />
              </div>
              <div className="mr-2">
                <input
                  type="text"
                  name="second"
                  value={this.state.otp_code.second}
                  onChange={this.onChangeHandler.bind(this)}
                  maxLength="1"
                />
              </div>
              <div className="mr-2">
                <input
                  type="text"
                  name="third"
                  value={this.state.otp_code.third}
                  onChange={this.onChangeHandler.bind(this)}
                  maxLength="1"
                />
              </div>
              <div className="mr-2">
                <input
                  type="text"
                  name="fourth"
                  value={this.state.otp_code.fourth}
                  onChange={this.onChangeHandler.bind(this)}
                  maxLength="1"
                />
              </div>
              <div className="mr-2">
                <input
                  type="text"
                  name="fifth"
                  value={this.state.otp_code.fifth}
                  onChange={this.onChangeHandler.bind(this)}
                  maxLength="1"
                />
              </div>
            </div>
          </div>
        </form>
        <div className="otp_code_not_send text-center mt-4">
          <p>
            <Link to="/auth">I haven't received the code yet.</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default CustomerOTPAdd;
