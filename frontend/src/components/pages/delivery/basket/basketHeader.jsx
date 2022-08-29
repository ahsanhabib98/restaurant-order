import FeatherIcon from "feather-icons-react";
import React, { Component } from "react";

class BasketHeader extends Component {
  render() {
    return (
      <div className="basket_header border-bottom px-3 py-1">
        {/* <FeatherIcon icon="chevron-left" size="24" /> */}
        <h3 className="mb-0">Your Basket</h3>
        <span></span>
      </div>
    );
  }
}

export default BasketHeader;
