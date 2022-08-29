import React, { Component } from "react";
import DeliveryHeader from "../deliveryHeader";
import DeliveryTo from "../deliveryTo";
import Items from "./items";
import ItemsInfo from "./itemsInfo";

class ItemList extends Component {
  componentDidMount() {
    // document.title = "My item list";
  }

  render() {
    const { locationID } = this.props;

    // console.log(this.props);

    return (
      <div className="delivery_main">
        {/* <DeliveryHeader /> */}

        <ItemsInfo />
        <DeliveryTo />
        <Items locationID={locationID} handleItems={this.props.handleItems} />
      </div>
    );
  }
}

export default ItemList;
