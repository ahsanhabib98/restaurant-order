import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Steps, Step } from "react-step-builder";
import { connect } from "react-redux";

import AccountSetup from "./AccountSetup";
import { config } from "./Config";

import { authSignup } from "../../../../store/actions/auth";

class Signup extends Component {
  state = {
    account: {
      email: "",
      phone_number: "",
      first_name: "",
      last_name: "",
      password: "",
      partner_name: "",
      select_brand: "",
      is_owner: true,
      is_superuser: false,
    },
    company: {
      name: "",
    },
    loading: false,
    error: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const account = this.state.account;
    const company = this.state.company;

    this.props.signup(account, company, this.props.history);
  };

  changeCompanyHandler = (e) => {
    this.setState({
      company: { ...this.state.company, [e.target.name]: e.target.value },
    });
  };

  changeAccountHandler = (e) => {
    this.setState({
      account: { ...this.state.account, [e.target.name]: e.target.value },
    });
  };

  render() {
    return (
      <>
        {/* <nav data-v-165b6af7="" className="steps">
          <Link
            to="#"
            data-v-165b6af7=""
            data-test="tab"
            className="steps__item steps__item--active active"
          >
            <span data-v-165b6af7="">company info</span>
          </Link>
          <Link
            to="#"
            data-v-165b6af7=""
            data-test="tab"
            className="steps__item"
          >
            <span data-v-165b6af7="">Account setup</span>
          </Link>
        </nav> */}
        <Steps config={config}>
          {/* <Step
                        company={this.state.company}
                        changecompanyHandler={this.changecompanyHandler}
                        component={companyInfo} /> */}
          <Step
            account={this.state.account}
            company={this.state.company}
            handleSubmit={this.handleSubmit}
            changeAccountHandler={this.changeAccountHandler}
            changeCompanyHandler={this.changeCompanyHandler}
            component={AccountSetup}
          />
        </Steps>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (account, company, history) =>
      dispatch(authSignup(account, company, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
