import React, { Component } from "react";
import {addressListURL} from "../../../../constants";

class PaymentInfo extends Component {
  state = {
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    country: "Bangladesh"
  };

  componentDidMount() {
    const { customer } = this.props;
    this.setState({
      ...customer.address
    });
  }

  onchangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.handleAddressSave(this.state);
  };

  render() {
    return (
      <div>
        <h4 className="custom-text-primary">Billing Information</h4>
        <form>
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.onchangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={this.state.email}
              onChange={this.onchangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={this.state.address}
              onChange={this.onchangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={this.state.city}
              onChange={this.onchangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={this.state.state}
              onChange={this.onchangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Postcode</label>
            <input
              type="text"
              className="form-control"
              name="postcode"
              value={this.state.postcode}
              onChange={this.onchangeHandler}
            />
          </div>
          <button onClick={this.submitHandler} className="btn btn-primary btn-lg w-100">Save</button>
        </form>
      </div>
    );
  }
}

export default PaymentInfo;
