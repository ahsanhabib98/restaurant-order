import React, { Component } from "react";
import { connect } from "react-redux";
import {
  WebsiteOrderngDetailsAction,
  WebsiteOrderngUpdateAction,
} from "../../../store/actions/WebisteOrderingAction";
// import { Link } from 'react-router-dom'
import Header from "../../bases/Header";
import PageTitle from "../../bases/PageTitle";
import Sidebar from "../../bases/Sidebar";
import { Link } from "react-router-dom";
import { BASE_DOMAIN } from "../../../constants";

class WebSiteOring extends Component {
  state = {
    sub_domain: "",
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();

    const { restaurant_id } = this.props.authUser;
    this.props.WebsiteOrderngUpdateAction(restaurant_id, this.state);
    // window.location.href = `//dashboard.${BASE_DOMAIN}/website-ordering`;
  };

  handleRedirect = () => {
    console.log("handle");
    window.location.href = `//${this.state.sub_domain}.${BASE_DOMAIN}/delivery`;
  };

  componentDidMount() {
    const { sub_domain } = this.props.authUser;
    this.setState({ sub_domain: sub_domain });
    document.title = "Website Ordering | onnow";
  }

  render() {
    // console.log("Auth User: ", this.props.authUser);

    return (
      <div id="wrapper">
        <div className="navbar-nav">
          <Sidebar />
        </div>
        <div className="d-flex flex-column content_area">
          {/* <header> */}
          <Header />
          {/* </header> */}
          <div className="main_content">
            <div className="container-fluid">
              <PageTitle page_title="Website Ordering" />
              <div className="row">
                <div className="col-md-6 offset-3">
                  <div className="website_orderng">
                    <form onSubmit={this.submitHandler}>
                      <div className="form-group">
                        <label htmlFor="sub_domain">Domain Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your domain name"
                          name="sub_domain"
                          value={this.state.sub_domain}
                          onChange={this.changeHandler}
                        />
                      </div>
                      <button className="btn btn-primary mr-2">Update</button>
                      <button
                        onClick={() => this.handleRedirect()}
                        className="btn btn-success"
                      >
                        Visit Now
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.login_auth.user,
});

export default connect(mapStateToProps, {
  WebsiteOrderngDetailsAction,
  WebsiteOrderngUpdateAction,
})(WebSiteOring);
