import React, { Component } from "react";
import Header from "../../../bases/Header";
import Sidebar from "../../../bases/Sidebar";
import Pagination from "../../customers/Pagination";
import MenuHeader from "../MenuHeader";
import MenusTable from "./MenusTable";
import { connect } from "react-redux";

class Menus extends Component {
  render() {
    const { brandingID, subdomain } = this.props.match.params;
    const brand = this.props.brandings?.find(
      (each) => each.id === parseInt(brandingID)
    );
    return (
      <div id="wrapper">
        <div className="navbar-nav">
          <Sidebar />
        </div>
        <div className="d-flex flex-column content_area">
          <header>
            <Header />
          </header>

          <div className="main_content">
            <div className="container-fluid ">
              <div className="brand-name mt-4">
                <h5 className="custom-text-primary text-capitalize">
                  {brand ? brand.name : "Brand X"}
                </h5>
              </div>

              <MenuHeader
                title="Menus"
                itemLink={`/menu/${brandingID}/${subdomain}/menus-create`}
                submenu_name="Menus"
                create_link="/menu_create_3"
              />
              <br />
              <MenusTable match={this.props.match} />
              {/* <Pagination /> */}
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
    brandings: state.company.brandings,
  };
};
export default connect(mapStateToProps, {})(Menus);
