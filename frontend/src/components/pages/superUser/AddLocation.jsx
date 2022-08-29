import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./../../bases/Sidebar";
import Header from "./../../bases/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

import axios from "axios";
import { locationListURL } from "../../../constants";

class AddLocation extends Component {
  state = {
    place: "",
    parent: "",
    parentLocations: [],
  };
  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.locations?.length && !prevState.parentLocations?.length) {
      console.log(newProps);
      const parentLocations = newProps.locations?.map((parentLocation) => {
        return {
          id: parentLocation.id,
          name: parentLocation.name,
        };
      });
      return {
        parentLocations,
      };
    }
    return null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { place, parent } = this.state;
    if (!place) {
      alert('Please fillup "Place Field"');
      return;
    }
    const payload = {
      name: place,
    };
    if (parent) {
      payload.parent = parent;
    }
    axios
      .post(locationListURL, payload)
      .then(({ data }) => {
        alert("Location added.");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
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
                <Link
                  to="/superuser-locations"
                  className="d-flex align-items-center my-3 "
                >
                  <span>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                  </span>
                  <h4 className="text-muted mt-2 ml-2">Add Location</h4>
                </Link>

                <div className="row">
                  <div className="col-md-5">
                    <form
                      action=""
                      className="border rounded p-3"
                      onSubmit={this.handleSubmit}
                    >
                      {/* <div className="form-group">
                      <label htmlFor="">District</label>
                      <input
                        type="text"
                        className="form-control"
                        name="district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </div> */}
                      <div className="form-group">
                        <label htmlFor="">Outlet</label>
                        <select
                          className="custom-select"
                          onChange={(e) =>
                            this.setState({ parent: e.target.value })
                          }
                        >
                          <option value={0}>Select</option>
                          {this.state.parentLocations.map((location) => {
                            return (
                              <option
                                key={`sl-${location.id}`}
                                value={location.id}
                              >
                                {location.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Place</label>
                        <input
                          type="text"
                          className="form-control"
                          name="place"
                          value={this.state.place}
                          onChange={(e) => {
                            this.setState({ place: e.target.value });
                          }}
                        />
                      </div>
                      <button className="btn btn-primary btn-lg">
                        Save Location
                      </button>
                    </form>
                  </div>
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
export default connect(mapStateToProps, {})(AddLocation);
