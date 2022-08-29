import FeatherIcon from "feather-icons-react";
import React, { Component } from "react";
import axios from "axios";
import { addToCartURL, orderItemUpdateURL } from "../../../../constants";
import {addItem, getItemList, removeItem} from "../../../../utils";

export class BasketItemInfo extends Component {

  render() {
    const { order_items } = this.props;
    return (
      <>
        {order_items.map((order_item, i) => {
          return (
            <div
              className="basket_item_info d-flex justify-content-between align-items-center border-bottom"
              key={order_item.id}
            >
              <div className="basket_info ">
                <h3>{order_item.title}</h3>
                <p>BDT {order_item.price}</p>
              </div>

              <div className="basket_update">
                <div className="item_quantity text-center">
                  <button
                    onClick={() => this.props.decrementtBtton(order_item.id)}
                    className="mr-2"
                  >
                    <FeatherIcon icon="minus" size="15" />
                  </button>
                  <span>{order_item.count}</span>
                  <button
                    onClick={() =>
                      this.props.incrementBtton(
                        order_item.id
                      )
                    }
                    className="ml-2"
                  >
                    <FeatherIcon icon="plus" size="15" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

export default BasketItemInfo;
