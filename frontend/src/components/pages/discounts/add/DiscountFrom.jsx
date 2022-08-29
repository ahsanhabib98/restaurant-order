import React, { Component } from "react";

class DiscountFrom extends Component {
  render() {
    const { discount } = this.props;

    return (
      <div className="dicount_from discount-box">
        <h2 className="mb-3">Create a discount</h2>
        <form>
          <div className="form-group">
            <label htmlFor="discount_name">Discount Name *</label>
            <input
              type="text"
              placeholder="E.g. Taco Thusday!"
              className="form-control"
              name="name"
              defaultValue={discount.name}
              onChange={this.props.onchangeHandler}
            />
          </div>
          <div className="ro">
            {/* <div className="col-md-10"> */}
            <div className="form-group">
              <label htmlFor="discount_name">Discount code *</label>
              <input
                type="text"
                placeholder="E.g. ONNOW10OFF"
                className="form-control"
                name="code"
                defaultValue={discount.code}
                onChange={this.props.onchangeHandler}
              />
            </div>
            {/* <div className="col-md-2 pl-lg-0"> */}
            {/*<button className="btn btn-primary btn-discoun btn-lg mt-0">*/}
            {/*  Generate*/}
            {/*</button>*/}
            {/* </div> */}
          </div>
        </form>
      </div>
    );
  }
}

export default DiscountFrom;
