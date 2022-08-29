import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    currentYear: new Date().getFullYear(),
  };

  render() {
    return (
      <div className="card p-3 order_history_main">
        <div className="row ">
          {/* <p>hello: {this.state.currentYear}</p> */}
          <div className="col-md-2">
            <input
              className="form-control  mb-3"
              type="text"
              placeholder="ID"
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control  mb-3"
              type="text"
              placeholder="Phone"
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control  mb-3"
              type="text"
              placeholder="Outlets"
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control  mb-3"
              type="date"
              placeholder="Date"
            />
          </div>
          <div className="col-md-4">
            <select
              className="custom-select mb-3"
              aria-label="Default select example"
            >
              <option value="1">New</option>
              <option value="2">In Kitchen</option>
              <option value="3">In Route/Ready</option>
              <option value="4">Delivered</option>
              <option value="5">Rejected</option>
              <option value="6">Cancelled</option>
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="custom-select  mb-3"
              aria-label="Default select example"
            >
              <option defaultValue>Web</option>
              {/* <option value="1">Adwords</option>
              <option value="2">Facebook</option>
              <option value="3">LinkedIn</option> */}
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="custom-select  mb-3"
              aria-label="Default select example"
            >
              {/* <option defaultValue>Type</option> */}
              <option value="1">Delivery</option>
              {/* <option value="2">Pick Up</option>
              <option value="3">Dine-in</option> */}
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="custom-select  mb-3 mb-md-0 mb-lg-0"
              aria-label="Default select example"
            >
              {/* <option defaultValue>Payment Mode</option> */}
              <option value="1">Cash</option>
              <option value="2">Digital Payment</option>
              {/* <option value="2">Pick Up</option>
              <option value="3">Dine-in</option> */}
            </select>
          </div>
          <div className="col-md-4">
            <button type="button" className="btn btn-primary btn-lg">
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
