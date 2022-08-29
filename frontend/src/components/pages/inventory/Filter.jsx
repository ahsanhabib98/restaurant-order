import React, { Component } from "react";

class Filter extends Component {
  render() {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="w-50">
            <input
              type="text"
              onChange={this.props.searchHandler}
              name="search"
              value={this.props.searchValue}
              className="form-control"
              placeholder="Search for items..."
            />
          </div>
          <div className=" ">
            <h6>Availability</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
