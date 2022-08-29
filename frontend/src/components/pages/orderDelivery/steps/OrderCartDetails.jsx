import React, { Component } from "react";
import styled from "styled-components";

class OrderCartDetails extends Component {
  render() {
    const { order, outlet, customer } = this.props;
    const total_tax = order.total * (outlet.tax_rate / 100);

    let total_with_discount = 0;
    let discount = 0;
    if (this.props.company.discount) {
      if (this.props.company.discount.type === "PERCENTAGE_VALUE") {
        discount = order.total * (this.props.company.discount.amount / 100);
        total_with_discount = order.total - discount;
      } else {
        discount = this.props.company.discount.amount;
        total_with_discount = order.total - discount;
      }
    } else {
      total_with_discount = order.total;
    }

    const total = total_with_discount + total_tax + outlet.delivery_fee;

    const Button = styled.button`
      transition: 0.4s;

      &:hover {
        background: ${this.props.base_color} !important;
        opacity: 0.8;import { styled } from 'styled-components';

      }
    `;

    return (
      <div>
        <div className="bill-for d-flex">
          <h6 className="custom-text-primary mr-2">Bill For:</h6>
          <span>{this.props.customer.phone_number}</span>
        </div>

        <h6 className="name font-weight-semibold custom-text-primary my-3">
          Friggy's
        </h6>

        <ul className="order-items">
          {this.props.order &&
            this.props.order.order_items.map((order_item, i) => {
              return (
                <li className="box" key={i}>
                  <h6 className="mb-0">{order_item.item.title}</h6>
                  <h6 className="mb-0">{order_item.final_price} BDT</h6>
                </li>
              );
            })}
        </ul>

        <ul className="sub-total">
          <li className="box">
            <span>Subtotal</span>
            <span>{this.props.order.total} BDT</span>
          </li>
          <li className="box">
            <span>Tax</span>
            <span>{total_tax} BDT</span>
          </li>
          <li className="box">
            <span>Delivery Fee</span>
            <span>{outlet.delivery_fee} BDT</span>
          </li>
          <li className="box">
            <span>
              Discount{" "}
              {this.props.company.discount.type === "PERCENTAGE_VALUE" &&
                `${this.props.company.discount.amount} %`}
            </span>
            <span>{discount} BDT</span>
          </li>
        </ul>

        <h6 className="box">
          <span>Total</span>
          <span>{total} BDT</span>
        </h6>

        <div className="paymentMethod form-group border rounded p-3 mt-4">
          <div className="header-box">
            <p className="font-weight-semibold text-mute mb-0">
              Payment methods
            </p>
            <small>Select all payment methods accept on delivery</small>
          </div>

          <div className="form-check mt-3 mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="cardOnDelivery"
              id="cardOnDelivery"
              value="CARD_ON_DELIVERY"
              onChange={(e) => this.props.getPaymentMethod(e.target.value)}
              checked={this.props.paymentMethod === "CARD_ON_DELIVERY"}
            />
            <label className="form-check-label" htmlFor="cardOnDelivery">
              Digital Payment
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="cashOnDelivery"
              id="cashOnDelivery"
              value="CASH_ON_DELIVERY"
              onChange={(e) => this.props.getPaymentMethod(e.target.value)}
              checked={this.props.paymentMethod === "CASH_ON_DELIVERY"}
            />
            <label className="form-check-label" htmlFor="cashOnDelivery">
              Cash on Delivery
            </label>
          </div>
        </div>

        <div className="address text-muted">
          {customer.address ? (
            <>
              <div className="d-flex">
                <h6 className="mr-2 mb-0">Address:</h6>
                <p className="mb-0">
                  {customer.address.address}, {customer.address.city},{" "}
                  {customer.address.postcode},{customer.address.country}
                </p>
              </div>
              <div className="d-flex">
                <h6 className="mr-2 mb-0">Phone No:</h6>
                <p className="mb-0">{this.props.customer.phone_number}</p>
              </div>
            </>
          ) : (
            <>
              <h6>You have no address.</h6>
            </>
          )}
        </div>

        <div className="mt-3">
          {customer.address ? (
            <a
              onClick={this.props.handleEditAddress}
              className="btn custom-text-primary font-weight-semibold p-0"
            >
              Edit Address
            </a>
          ) : (
            <a
              onClick={this.props.handleEditAddress}
              className="btn custom-text-primary font-weight-semibold p-0"
            >
              Create Address
            </a>
          )}
        </div>

        {this.props.paymentMethod && customer.address && (
          <div className="mt-3">
            <Button
              aria-disabled="true"
              onClick={(e) => this.props.handleConfirmOrder(total)}
              className="btn btn-primary text-white btn-lg w-100"
            >
              Confirm Order
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default OrderCartDetails;
