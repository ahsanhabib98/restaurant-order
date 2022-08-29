import React, { Component } from "react";

class ApplicableOutlets extends Component {
  render() {
    const { discount } = this.props;
    
    return (
      <div className="discount-box-wrapper">
        <form className="mt-" onSubmit={this.props.handleDiscountSubmit}>
          <div className="discount_application discount-box">
            <h4 className="mb-2">Discount type</h4>

            <div className="row my-3">
              <div className="col-md-6">
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="type"
                      defaultValue="PERCENTAGE_VALUE"
                      onChange={this.props.onchangeHandler}
                      checked={discount.type === "PERCENTAGE_VALUE"}
                    />
                    Percentage (%)
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="type"
                      defaultValue="FIXED_VALUE"
                      onChange={this.props.onchangeHandler}
                      checked={discount.type === "FIXED_VALUE"}
                    />
                    Fixed value (BDT)
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label htmlFor="discount_name">Amount *</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="form-control"
                    name="amount"
                    defaultValue={discount.amount}
                    onChange={this.props.onchangeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="discount_name">Minimum order value </label>
                  <input
                    type="number"
                    placeholder="BDT 0.00"
                    className="form-control"
                    name="minimum_order_value"
                    defaultValue={discount.minimum_order_value}
                    onChange={this.props.onchangeHandler}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="discount_name">Maximum discount</label>
                  <input
                    type="number"
                    placeholder="BDT 0.00"
                    className="form-control"
                    name="maximum_discount"
                    defaultValue={discount.maximum_discount}
                    onChange={this.props.onchangeHandler}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="discount_application ">
            <h4 className="mb-2">Customer Segmentation</h4>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label htmlFor="discount_name">
                    Number of uses per customer
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="number_of_uses"
                    defaultValue={discount.number_of_uses}
                    onChange={this.props.onchangeHandler}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="discount_application discount-box">
            <h4 className="mb-2">Availability</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="discount_name">Start Date *</label>
                  <input type="date" className="form-control text-uppercase" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="discount_name">Start Time *</label>
                  <input type="time" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="mb-0">
                    <input
                      className="mt-0"
                      type="radio"
                      defaultValue="specificDate"
                      onChange={this.props.onchangeHandler}
                      checked={this.props.selectedOption === "specificDate"}
                    />
                    <span className="ml-2">Expires on a specific date</span>
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="mb-0">
                    <input
                      className="mt-0"
                      type="radio"
                      defaultValue="neverExpire"
                      onChange={this.props.onchangeHandler}
                      checked={this.props.selectedOption === "neverExpire"}
                    />
                    <span className="ml-2">Never expires</span>
                  </label>
                </div>
              </div>
            </div>

            {this.props.isNeverExpired !== true && (
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="discount_name">End Date *</label>
                    <input
                      type="date"
                      className="form-control text-uppercase"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="discount_name">End Time</label>
                    <input type="time" className="form-control" />
                  </div>
                </div>
              </div>
            )}
          </div> */}
          <button className="btn btn-primary btn-discoun btn-lg">
            Save Discount
          </button>
        </form>
      </div>
    );
  }
}
export default ApplicableOutlets;
