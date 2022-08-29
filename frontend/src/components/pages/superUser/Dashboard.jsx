import React, { Component } from "react";
import Sidebar from "./../../bases/Sidebar";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { connect } from "react-redux";
import "../../../css/superAdmin.scss";
import Header from "../../bases/Header";
import { dashboardWiseCustomerOrderURL } from "../../../constants";
import CustomarTable from "../dashboard/CustomarTable";
import Status from "../dashboard/Status";

class SuperUserDashboard extends Component {
  state = {
    customer_order: null,
  };
  componentDidMount() {
    this.handleFetchCustomerList();
  }

  handleFetchCustomerList = () => {
    axios.get(`${dashboardWiseCustomerOrderURL}`).then((res) => {
      this.setState({
        customer_order: res.data,
      });
    });
  };

  render() {
    return (
      <div id="wrapper" className="super-admin">
        <div className="navbar-nav">
          <Sidebar />
        </div>
        <div className="d-flex flex-column content_area">
          <div className="super-user-wrapper">
            <Header />
            {/* <div className="main-heading border-bottom py-3">
              <div className="container-fluid">
                <h3 className="custom-text-primary font-weight-bold mb-0">
                  Dashboard
                </h3>
              </div>
            </div> */}
            <div className="main-content">
              <div className="container-fluid">
                <h4 className="text-muted font-weight-bol mb-0 mt-4">
                  Dashboard
                </h4>

                <div className="overview mt-3">
                  <div className="row mt-3">
                    <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
                      <select
                        name=""
                        id=""
                        className="custom-select text-capitalize"
                      >
                        <option value="2">Current day</option>
                        <option value="3">Previous day</option>
                        <option value="1">Current month</option>
                        <option value="4">Last 30 days</option>
                        <option value="5">Previous Month</option>
                        <option value="6">Lifetime</option>
                      </select>
                    </div>
                  </div>
                  <Status customer_order={this.state.customer_order} />
                </div>
                <div className="customers-info mt-4">
                  {/*<h5 className="text-dark text-capitalize font-weight-bold mb-3">*/}
                  {/*  New customers X returning customers*/}
                  {/*</h5>*/}
                  <CustomarTable customer_order={this.state.customer_order} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login_auth.user,
  };
};

export default connect(mapStateToProps)(SuperUserDashboard);
