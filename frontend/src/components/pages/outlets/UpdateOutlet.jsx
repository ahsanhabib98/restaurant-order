import React, { Component } from "react";
import Header from "../../bases/Header";
import Sidebar from "../../bases/Sidebar";
import OutletCreateUpdate from "./OutletCreateUpdate";
import { outLetURL } from "../../../constants";
import axios from "axios";

class UpdateOutlet extends Component {
  state = {
    outlet: null,
  };
  componentDidMount() {
    const outletID = this.props.match.params.id;
    const url = `${outLetURL}${outletID}/`;
    axios.get(url).then(({ data }) => {
      if (!data) {
        return;
      }
      this.setState({
        outlet: data,
      });
    });
  }
  render() {
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
            {this.state.outlet ? (
              <div className="container-fluid">
                <OutletCreateUpdate outlet={this.state.outlet} />
              </div>
            ) : (
              <div>
                <h3>Outlet not found</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default UpdateOutlet;
