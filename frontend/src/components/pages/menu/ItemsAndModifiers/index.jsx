import React, { Component } from "react";
import Header from "../../../bases/Header";
import Sidebar from "../../../bases/Sidebar";
import MenuHeader from "../MenuHeader";
import ItemTable from "./ItemTable";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";

class ItemsAndModifiers extends Component {
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
          {/* <header> */}
          <Header />
          {/* </header> */}
          <div className="main_content">
            <div className="container-fluid ">
              <div className="brand-name mt-4">
                <h5 className="custom-text-primary  text-capitalize">
                  {brand ? brand.name : "Brand X"}
                </h5>
              </div>

              <MenuHeader
                itemLink={`/menu/${brandingID}/${subdomain}/items-modifiers-create`}
                title="Items & Modifiers"
                submenu_name="Items"
                create_link="/menu_create_1"
              />
              <br />
              <SearchBar />
              <br />
              <ItemTable brand_subdomain={subdomain} match={this.props.match} />
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
export default connect(mapStateToProps, {})(ItemsAndModifiers);
