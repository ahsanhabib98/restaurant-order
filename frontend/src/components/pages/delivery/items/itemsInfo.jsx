import FeatherIcon from "feather-icons-react";
import React, { Component } from "react";

class ItemsInfo extends Component {
  render() {
    return (
      <div className="item_info px-3 pb-3">
        {/* <div className="form-group mb- mt-3">
          <label htmlFor="" className="font-weight-semibold">
            Delivery areas
          </label>
          <select name="" id="" className="custom-select">
            <option value="">Dhanmondi</option>
            <option value="">Mohammadpur</option>
            <option value="">Zigatoal</option>
            <option value="">Shangkar</option>
          </select>
        </div> */}

        <div className="header_title">
          <h5 className="font-weight-semibold text-capitalize">onnow</h5>
        </div>
        <p>
          Western Garden City, 442 East Nakhalpara, Tejgaon, Dhaka, Bangladesh
        </p>
        <div className="info">
          <span>
            <FeatherIcon icon="clock" size="11" /> 15 - 25 min
          </span>
          {/* <span className="ml-4">
            <FeatherIcon icon="shopping-bag" size="12" /> 15 - 25 min
          </span> */}
        </div>
      </div>
    );
  }
}

export default ItemsInfo;
