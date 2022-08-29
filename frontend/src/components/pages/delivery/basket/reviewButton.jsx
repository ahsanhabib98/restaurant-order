import React, { Component } from "react";
import styled from "styled-components";

class ReviewButton extends Component {
  render() {
    const Button = styled.button`
      transition: 0.4s;

      &:hover {
        background: ${this.props.base_color} !important;
        opacity: 0.8;
      }
    `;

    return (
      <div className="review_button">
        {/* <button className="btn btn-primary btn-lg w-100">
                <small>Review Order</small>
              </button>
              {previousButton} */}

        <div className="btn-container p-0">
          {/* previous btn */}
          {/* {previousButton} */}

          <Button
            onClick={this.props.handleReviewOrder}
            className="btn btn-primary w-100 bg-lg"
          >
            Review Order
          </Button>
        </div>
      </div>
    );
  }
}

export default ReviewButton;
