import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./../../../bases/Sidebar";
import Header from "./../../../bases/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BrandForm from "./BrandForm";
import { locationAction } from "../../../../store/actions/companyAction";
import { connect } from "react-redux";

class CreateBrandInfo extends Component {
  state = {
    brandName: "",
  };
  componentDidMount() {
    this.props.locationAction();
  }
  render() {
    const { brandName } = this.state;
    return (
      <div id="wrapper">
        <div className="navbar-nav">
          <Sidebar />
        </div>
        <div className="d-flex flex-column content_area">
          <Header />

          <div className="main_content">
            <div className="container-fluid">
              <div className="brand-info-wrapper">
                <span>
                  <Link
                    to="/management"
                    className="d-flex align-items-center my-3 "
                  >
                    <span>
                      <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                    </span>
                    <h4 className="text-muted mt-2 ml-3">
                      {brandName ? brandName : "Brand"}
                    </h4>
                  </Link>
                </span>

                <BrandForm
                  locations={this.props.locations}
                  history={this.props.history}
                  handleBrandName={(brandName) => {
                    this.setState({ brandName });
                  }}
                />
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
    locations: state.company.locations,
  };
};
export default connect(mapStateToProps, { locationAction })(CreateBrandInfo);
