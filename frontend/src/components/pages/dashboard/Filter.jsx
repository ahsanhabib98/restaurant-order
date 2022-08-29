import React, { Component } from "react";
import FeatherIcon from "feather-icons-react";

class Filter extends Component {
  render() {
    return (
      <div className="row justify-content-between ">
        <div className="col-md-3">
          <select
            className="custom-select text-capitalize multiselect__singl"
            aria-label="Default select example"
          >
            <option defaultValue>Current month</option>

            <option value="2">
              Current day
              {/* <FeatherIcon icon="check" size="15" /> */}
            </option>
            <option value="3">Previous day</option>
            <option value="4">Last 7 days</option>
            <option value="5">Last 30 days</option>
            <option value="5">Previous Month</option>
            <option value="5">Lifetime</option>
          </select>
        </div>

        {/* <div className="col-md-6 text-md-right mt-sm-20 w-sm-100">
          <button className="btn btn-primary btn-lg">
            Launch Market Activity
          </button>
        </div> */}
      </div>
    );
  }
}

export default Filter;
