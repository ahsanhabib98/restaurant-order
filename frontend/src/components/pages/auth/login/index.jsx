import React, { Component } from "react";
import { connect } from "react-redux";
// import { authLogin } from '../../../../store/actions/auth';
import { login } from "../../../../store/actions/authAction";
import ClientFeedback from "./ClientFeedback";
import LoginForm from "./loginForm";
import LoginIntro from "./LoginIntro";
import { setAuthToken } from "../../../../init";

class LoginView extends Component {
  state = {
    email: "",
    password: "",
    pathname: "",
  };

  componentDidMount() {
    // const pathname = this.props.location.pathname;

    this.setState({
      pathname: this.props.location.pathname.replace(/\//g, ""),
    });

    localStorage.removeItem("token");
    setAuthToken(null);
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password }, this.props.history);
    // if(e.target.email !== email && e.target.password !== password) {
    //     alert("Email and Password not match");
    // }else{
    //     alert("Login successfully");
    //     this.props.login({email, password}, this.props.history);
    // }
  };

  render() {
    const { email, password, pathname } = this.state;
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
                <LoginIntro pathname={pathname} />
              </div>
              <br />
              <LoginForm
                email={email}
                password={password}
                submitHandler={this.submitHandler}
                changeHandler={this.changeHandler}
                pathname={pathname}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { login })(LoginView);
