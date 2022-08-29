import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./../../bases/Sidebar";
import Header from "./../../bases/Header";
import BootstrapTable from "react-bootstrap-table-next";
import { connect } from "react-redux";

class LocationList extends Component {
  state = {
    locations: [],
  };
  columns = [
    {
      dataField: "id",
      text: "SL No.",
      sort: true,
    },
    {
      dataField: "district",
      text: "District",
      sort: true,
    },
    {
      dataField: "place",
      text: "Place ",
      sort: true,
    },
  ];
  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.locations?.length && !prevState.locations?.length) {
      const locations = [];
      let count = 1;
      newProps.locations?.forEach((parentLocation) => {
        if (parentLocation.child?.length) {
          parentLocation.child.forEach((location) => {
            locations.push({
              id: count,
              district: parentLocation.name,
              place: location.name,
            });
            count++;
          });
        } else {
          locations.push({
            id: count,
            district: parentLocation.name,
            place: "",
          });
          count++;
        }
      });
      return {
        locations,
      };
    }
    return null;
  }
  render() {
    const { locations } = this.state;
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
                Locations
              </h3>
            </div>
          </div> */}

            <div className="main-content">
              <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center  mt-4">
                  <h4 className="text-muted font-weight-bol mb-0">
                    Added Locations
                  </h4>

                  <Link to="/add-locations" className="btn btn-primary btn-lg">
                    Add New
                  </Link>
                </div>

                <div className="customers-info mt-4">
                  <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={locations}
                    columns={this.columns}
                  />
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
    locations: state.company.locations,
  };
};
export default connect(mapStateToProps, {})(LocationList);
