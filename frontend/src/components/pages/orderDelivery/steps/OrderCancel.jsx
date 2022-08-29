import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FeatherIcon } from "feather-icons-react";

const OrderCancel = () => {
  return (
    <div>
      <div className="cancel-items">
        <div className="item border-bottom p-3">
          <p className="text-muted mb-2 w-100">Order ID</p>
          <h6 className="custom-text-primary mb-0">#65489456</h6>
        </div>
      </div>

      <div className="cancelled text-center p-5">
        {/* <FeatherIcon icon="close" /> */}

        <FontAwesomeIcon
          icon={faTimesCircle}
          size="3x"
          className="custom-text-primary mb-2"
        />
        <p>Your order has been cancelled</p>
      </div>
    </div>
  );
};

export default OrderCancel;
