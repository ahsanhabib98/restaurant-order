import React, { Component } from "react";
import { connect } from "react-redux";
import { customerURL } from "../../../constants";
import Header from "../../bases/Header";
import PageTitle from "../../bases/PageTitle";
import Sidebar from "../../bases/Sidebar";
import ResultTable from "./ResultTable";
import SearchTable from "./SearchTable";

import axios from "axios";

class Customers extends Component {
  state = {
    customers: [],
  };
  componentDidMount() {
    axios.get(customerURL).then(({ data }) => {
      this.setState({customers: data});
    });
  }
  render() {
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
            <div className="container-fluid ">
              <PageTitle page_title="Customers" />
              <SearchTable />
              <br />
              <ResultTable customers={this.state.customers} subdomain={this.props.subdomain} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subdomain: state.login_auth.user.sub_domain,
  };
};

export default connect(mapStateToProps)(Customers);
