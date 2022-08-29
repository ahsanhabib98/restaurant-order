import React, { Component } from "react";

export class BasketPricing extends Component {
  render() {
    const { items } = this.props;
    let total = 0
    items.map((item) => {
      total += item.price*item.count
    })
    let total_with_discount = 0
    let discount = 0
    if (this.props.company.discount) {
      if (this.props.company.discount.type === 'PERCENTAGE_VALUE') {
        discount = total*(this.props.company.discount.amount/100)
        total_with_discount = total - discount;
      } else {
        discount = this.props.company.discount.amount;
        total_with_discount = total - discount;
      }
    } else {
      total_with_discount = total;
    }

    return (
      <div className="basket_pricing mb-3">
        <div className="pricing">
          <ul>
            <li>
              Basket Total <small>(Inclusive of VAT)</small>
              <span>BDT {total}</span>
            </li>
            <li>
              Delivery Fee <span>BDT {this.props.outlet.delivery_fee}</span>
            </li>
            <li>
              Discount {this.props.company.discount.type === "PERCENTAGE_VALUE" && `${this.props.company.discount.amount} %`} <span>BDT {discount}</span>
            </li>
            <li className="border-top mt-2 pt-2">
              <b>Total</b>
              <span>
                <b>BDT {total_with_discount + this.props.outlet.delivery_fee}</b>
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default BasketPricing;
