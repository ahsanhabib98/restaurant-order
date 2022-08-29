import React, { Component } from "react";

class SearchTable extends Component {
  render() {
    return (
      <div className="card p-3">
        <div className="searchbar-row">
          <div className="row ">
            <div className="col-md-4 col-xl-3 mb-sm-20">
              {/* <label>Name</label> */}
              <input
                id="name"
                className="form-control"
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="col-md-4 col-xl-3 mb-sm-20">
              {/* <label>Email</label> */}
              <input
                id="email"
                className="form-control"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="col-md-4 col-xl-3 mb-sm-20">
              {/* <label>Phone</label> */}
              <input
                id="phone"
                className="form-control"
                type="phone"
                placeholder="Phone"
              />
            </div>
            <div className="col-md-4 col-xl-3">
              <button type="button" className="btn btn-primary btn-lg">
                Search
              </button>
              {/* <div className="btn-container p-0 mt-md-3  mt-xl-0">
                <button type="button" className="btn btn-secondary btn-lg">
                  Export Data
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchTable;
