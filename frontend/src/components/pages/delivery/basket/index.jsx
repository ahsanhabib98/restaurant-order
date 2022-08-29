import React, { Component } from "react";
import axios from "axios";
import BasketHeader from "./basketHeader";
import BasketItemInfo from "./basketItemInfo";
import BasketPricing from "./basketPricing";
import ReviewButton from "./reviewButton";
import SpecialInstructions from "./specialInstructions";

import { orderSummaryURL } from "../../../../constants";
import { connect } from "react-redux";
import { ItemDetail } from "../items/itemDetail";
import { addItem, getItemList, removeItem } from "../../../../utils";

import styled from "styled-components";
class Basket extends Component {
  state = {
    order_items: [],
    error: null,
    loading: false,
  };

  componentDidMount() {
    const order_items = getItemList();
    this.setState({
      order_items: order_items,
    });
  }

  decrementtBtton = (itemID) => {
    const { order_items } = this.state;
    const item = order_items.find((order_item) => order_item.id === itemID);
    removeItem(item);
    for (let i = 0; i < order_items.length; i++) {
      if (item.id === order_items[i].id) {
        order_items[i].count--;
      }
    }
    this.setState({
      order_items: order_items,
    });
  };

  incrementBtton = (itemID) => {
    const { order_items } = this.state;
    const item = order_items.find((order_item) => order_item.id === itemID);
    addItem(item);
    for (let i = 0; i < order_items.length; i++) {
      if (item.id === order_items[i].id) {
        order_items[i].count++;
      }
    }
    this.setState({
      order_items: order_items,
    });
  };

  // handleFetchOrder = () => {
  //   this.setState({ loading: true });
  //   axios
  //     .get(orderSummaryURL)
  //     .then((res) => {
  //       this.setState({ data: res.data, loading: false });
  //     })
  //     .catch((err) => {
  //       if (err.response.status === 404) {
  //         this.setState({
  //           error: "You currently do not have an order",
  //           loading: false,
  //         });
  //       } else {
  //         this.setState({ error: err, loading: false });
  //       }
  //     });
  // };

  render() {
    if (!this.state.order_items?.length) return null;

    return (
      <div className="delivery_main">
        <BasketHeader />

        <div className="px-3">
          <BasketItemInfo
            order_items={this.state.order_items}
            incrementBtton={this.incrementBtton}
            decrementtBtton={this.decrementtBtton}
          />
          <SpecialInstructions />
          <BasketPricing
            items={this.state.order_items}
            outlet={this.props.outlet}
            company={this.props.company}
          />
          <ReviewButton
            handleReviewOrder={this.props.handleReviewOrder}
            base_color={this.props.base_color}
          />
          {/* <ReviewButton previousButton={this.props.previousButton} /> */}
          {/* {this.props.previousButton} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subdomain: state.login_auth.user.sub_domain,
  };
};

export default connect(mapStateToProps)(Basket);
