import FeatherIcon from "feather-icons-react";
import React, { Component } from "react";

import { sendOtpCodeURL, smsGetWayURL } from "../../../../constants";
import axios from "axios";
import styled from "styled-components";

class Auth extends Component {
  state = {
    phone_number: "",
    error: null,
  };

  // onChangeHandler = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   const { phone_number } = this.state;
  //   const otp_code = ("" + Math.random()).substring(2, 7);
  //   // .then(res => {
  //   //   console.log(res.data);
  //   // })
  //   axios.put(sendOtpCodeURL(phone_number), { otp_code }).catch((err) => {
  //     this.setState({ error: err });
  //   });
  //
  //   //  .then(res => {
  //   //    console.log(res.data);
  //   //  })
  //   axios.get(smsGetWayURL(phone_number, otp_code)).catch((err) => {
  //     this.setState({ error: err });
  //   });
  //   this.props.history.push(`${phone_number}/otp-add`);
  // };

  render() {
    const Button = styled.button`
      transition: 0.4s;

      &:hover {
        background: ${this.props.base_color} !important;
        opacity: 0.8;import { styled } from 'styled-components';

      }
    `;

    return (
      <div className="otp_main pt-3 pl-3 pr-3">
        <FeatherIcon icon="arrow-left" size="25" />
        <h2>Enter your phone number</h2>
        <p>We will send you an SMS with a one-time verification code</p>
        <form className="mt-3">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="+88 01812-345678"
              name="phone_number"
              defaultValue={this.state.phone_number}
              onChange={this.props.handlePhoneChange}
            />
          </div>
          <Button
            onClick={this.props.handleSendCode}
            className="btn btn-primary btn-lg w-100"
          >
            Send code
          </Button>
        </form>
      </div>
    );
  }
}

export default Auth;
