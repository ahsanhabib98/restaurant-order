import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
class AddedToBasket extends Component {
  render() {
    const Button = styled.button`
      transition: 0.4s;

      &:hover {
        background: ${this.props.base_color} !important;
        opacity: 0.8;import { styled } from 'styled-components';

      }
    `;

    return (
      <div className="text-center py-5">
        <h6>Your order has been added to Basket</h6>

        <p className="custom-text-primary my-4">
          <FontAwesomeIcon icon={faCheckCircle} size="3x" />
        </p>

        <p>You may want to add another item!</p>
        <Button
          onClick={this.props.handleAddBasket}
          className="btn btn-primary"
        >
          Add item
        </Button>
        <br />
        <button
          onClick={this.props.handleReviewBasket}
          className="btn btn-outline-dark mt-5"
        >
          No, Proceed to Checkout
        </button>
      </div>
    );
  }
}

export default AddedToBasket;
