import React, { Component } from "react";
import Header from "../../../../bases/Header";
import Sidebar from "../../../../bases/Sidebar";
import AddCategory from "./AddCategory";
import CategoriesList from "./CategoriesList";
import MenuDetails from "./MenuDetails";
import MenuHeader from "./MenuHeader";

class ViewMenu extends Component {
  render() {
    const {
      match: { params },
    } = this.props;
    return (
      <div id="wrapper">
        <div className="navbar-nav">
          <Sidebar />
        </div>
        <div className="d-flex flex-column content_area">
          {/* <header className="border-bottom"> */}
          <Header />
          {/* </header> */}

          <div className="main_content mt-4">
            <div className="container">
              {/* <MenuHeader /> */}

              <h5>Edit Menu</h5>

              <div className="card mt-3 p-3 mb-4">
                <MenuDetails id={params.id} />

                <CategoriesList />
                <AddCategory />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewMenu;
