import axios from "axios";
import FeatherIcon from "feather-icons-react";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  BASE_DOMAIN,
  addToCartURL,
  orderItemDeleteURL,
  orderItemUpdateURL,
  orderSummaryURL,
} from "../../../../constants";
import { ItemDetail } from "./itemDetail";

import { addItem, removeItem, getItemList } from "../../../../utils";
import styled from "styled-components";
class AddItemDetail extends Component {
  state = {
    count: 0,
    data: [],
    error: null,
    loading: false,
    subdomain: "",
  };

  componentDidMount() {
    const item = getItemList().find((item) => item.id === this.props.itemID);
    let count = item ? item.count : 0;
    const subdomain = window.location.host.split(".")[0];
    this.setState({ subdomain, count });
    this.handleFetchOrder();
  }

  handleFetchOrder = () => {
    this.setState({ loading: true });
    axios
      .get(orderSummaryURL)
      .then((res) => {
        const { itemID } = this.props;
        if (res.data.order_items.length) {
          const order_item = res.data.order_items.find(
            (order_item) => order_item.item.id === itemID
          );
          const quantity = order_item.quantity;
          // console.log(order_item);
          this.setState({ count: quantity, data: order_item, loading: false });
        } else {
          this.setState({ data: res.data, loading: false });
        }
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          this.setState({
            error: "You currently do not have an order",
            loading: false,
          });
        } else {
          this.setState({ error: err, loading: false });
        }
      });
  };

  decrementtBtton = () => {
    if (this.state.count == 0) return;
    const { itemID, email, item } = this.props;
    const subdomain = this.state.subdomain;
    // if (email === undefined) {
    //   window.location.href = `//${this.state.subdomain}.${BASE_DOMAIN}/`;
    // }
    // if (this.state.count === 1) {
    //   this.handleRemoveOrderItem();
    // }
    const orderItem = { itemID, subdomain };
    removeItem(item);
    this.setState({
      count: this.state.count - 1,
    });
    // axios
    //   .post(orderItemUpdateURL, orderItem)
    //   .then((res) => {
    //     this.setState({
    //       count: this.state.count - 1,
    //     });
    //   })
    //   .catch((err) => {
    //     this.setState({ error: err });
    //   });
  };

  incrementBtton = () => {
    const { locationID, outletID, itemID, item, email } = this.props;
    const subdomain = this.state.subdomain;
    // if (email === undefined) {
    //   window.location.href = `//${subdomain}.${BASE_DOMAIN}/`;
    // }
    console.log(locationID);
    console.log(itemID);
    console.log(subdomain);

    const orderItem = {
      locationID,
      itemID,
      subdomain,
    };

    addItem(item);
    this.setState({
      count: this.state.count + 1,
    });
    // axios
    //   .post(addToCartURL, orderItem)
    //   .then((res) => {
    //     this.setState({
    //       count: this.state.count + 1,
    //     });
    //   })
    //   .catch((err) => {
    //     this.setState({ error: err });
    //   });
  };

  handleRemoveOrderItem = () => {
    const orderItemID = this.state.data.id;
    axios
      .delete(orderItemDeleteURL(orderItemID))
      .then((res) => {
        this.handleFetchOrder();
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  };

  buttonClickHandler = () => {
    const { locationID } = this.props;
    this.props.history.push(`/delivery-itemlist/${locationID}`);
  };

  render() {
    const Button = styled.button`
      transition: 0.4s;

      &:hover {
        background: ${this.props.base_color} !important;
        opacity: 0.8;
      }
    `;
    // console.log(this.props);

    return (
      <div className="basket_area border-top pt-3 mt-3">
        <h4 className="quantity_title">Quantity</h4>
        <div className="item_quantity text-center pt-3">
          <button onClick={this.decrementtBtton} className="mr-3">
            <FeatherIcon icon="minus" size="15" />
          </button>
          <span>{this.state.count}</span>
          <button onClick={this.incrementBtton} className="ml-3">
            <FeatherIcon icon="plus" size="15" />
          </button>
        </div>

        <div className="mb-3">
          <Button
            className="btn btn-primary w-100 d-flex justify-content-between btn-lg align-items-center mb-3 "
            onClick={this.props.handleBasket}
          >
            <span className="font-weight-bold">
              <FeatherIcon icon="shopping-cart" size="18" />
              <sub>{this.state.count}</sub>
            </span>
            <span className="btn_cart_text ml-4">Add to Basket</span>
            <small>BDT {this.state.count * this.props.item.price}</small>
          </Button>

          {/* previous btn */}
          {/* {this.props.previousButton} */}
        </div>
        {/* <button onClick={this.props.handleBasket} className="add_to_basket">
          <span>
            <FeatherIcon icon="shopping-cart" size="17" />
            <sub>0</sub>
          </span>
          <span className="btn_cart_text">Add to Basket</span> 
          <span>BDT 310.00</span>
        </button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.login_auth.user.email,
  };
};

export default connect(mapStateToProps)(withRouter(AddItemDetail));

// export default withRouter (AddItemDetail)
