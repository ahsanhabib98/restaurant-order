import FeatherIcon from "feather-icons-react";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class ItemDetailInfo extends Component {
  render() {
    const { item, locationID } = this.props;

    return (
      <div className="item_details_info">
        {/* <Link to={`/delivery-itemlist/${locationID}`}>
          <FeatherIcon icon="x" size="15" />
        </Link> */}
        {/* <div className="item_thumb text-center">
          <img src={item.avatar} alt="item" />
        </div> */}

        {/* <div className="modal-header-img mb-3">
          <img src={item.avatar} alt="" />
        </div> */}

        <h5 className="text-capitalize font-weight-semibold">{item.title}</h5>
        <p>BDT {item.price}</p>
        {item.description}
      </div>
    );
  }
}

export default ItemDetailInfo;
