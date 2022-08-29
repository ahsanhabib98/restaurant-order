import React, { Component } from "react";
import Header from "../../../../bases/Header";
import Sidebar from "../../../../bases/Sidebar";
import ItemDetails from "./ItemDetails";
import ItemHeader from "./ItemHeader";
import ModifierListCollapse from "./ModifierListCollapse";
import ModifierListModal from "./ModifierListModal";
import OutletsList from "./OutletsList";

class ViewItem extends Component {
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
          <header>
            <Header />
          </header>
          <div className="main_content">
            <div className="container-fluid items-and-modifiers border_top">
              <ItemHeader id={params.id} match={this.props.match} />
              <div className="card mt-3 p-3">
                <ItemDetails id={params.id} match={this.props.match} />
                <hr />
                <br />
                <OutletsList />
                <hr />
                <ModifierListModal />
                {/* <hr /> */}
                <br />
                <ModifierListCollapse />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewItem;
