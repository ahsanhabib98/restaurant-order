import React, { Component } from "react";
import Header from "../../bases/Header";
import PageTitle from "../../bases/PageTitle";
import Sidebar from "../../bases/Sidebar";
import BrandingFrom from "./BrandingFrom";
import { connect } from "react-redux";
// import TestForm from "./TestForm";

import "../../../css/branding.scss";

class Branding extends Component {
  componentDidMount() {
    document.title = "Branding | Onnow";
  }

  render() {
    const { brandingID } = this.props.match.params;
    const brand = this.props.brandings?.find(
      (each) => each.id === parseInt(brandingID)
    );
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
              <div className="page-title mt-3 mb-4">
                <h5 className="custom-text-primary">
                  {brand ? brand.name : "Brand X"}
                </h5>
                {/* <PageTitle page_title="" /> */}
                <h4 className="mb-0">Platform customization</h4>
                <small className="text-muted">
                  Change the appearance of your ordering platform and make it
                  look like your brand.
                </small>
              </div>

              {/* <TestForm /> */}

              <BrandingFrom match={this.props.match} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    brandings: state.company.brandings,
  };
};
export default connect(mapStateToProps, {})(Branding);

// http://prntscr.com/123wcd5
