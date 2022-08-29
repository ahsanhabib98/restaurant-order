import React, { Component } from "react";
import Sidebar from "./../../bases/Sidebar";
import Header from "./../../bases/Header";
import MangementHeader from "./MangementHeader";
// import BrandList from "./BrandList";
import { connect } from "react-redux";
import BrandTable from "./BrandTable";
import { brandingDeleteAction } from "../../../store/actions/companyAction";
import { Link } from "react-router-dom";
// import Pagination from "./../customers/Pagination";

class Management extends Component {
  state = {
    isDisable: true,
  };

  handleBrandDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      this.props.brandingDeleteAction(id);
    }
  };

  // componentDidMount() {
  //   this.props.companyDetailsAction(this.props.company_id)
  //   this.props.brandingListAction();
  // }

  render() {
    return (
      <div id="wrapper">
        <div className="navbar-nav">
          <Sidebar />
        </div>
        <div className="d-flex flex-column content_area">
          <Header />

          <div className="main_content mt-4">
            <div className="container-fluid">
              <div className="management-wrapper">
                <h5 className="mb-4">Management</h5>

                {this.props.company ? (
                  <MangementHeader company={this.props.company} />
                ) : null}

                <div className="brand-table mt-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="text-mute mb-0">Brands</h5>
                    <Link to="/brand-create" className="btn btn-primary">
                      Create
                    </Link>
                  </div>

                  {/* {this.props.brandings ? (
                    <BrandList brandings={this.props.brandings} />
                  ) : null} */}

                  <BrandTable handleBrandDelete={this.handleBrandDelete} />
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
    company_id: state.login_auth?.user.company_id,
    company: state.company.company,
    brandings: state.company.brandings,
  };
};
export default connect(mapStateToProps, { brandingDeleteAction })(Management);
