import React, { Component } from "react";
import { connect } from "react-redux";
import { getRestaurantOrder } from "../../../store/actions/restaurantOrderAction";

class Status extends Component {
  componentDidMount() {
    this.props.getRestaurantOrder("all");
  }

  getTotalSales(orders) {
    let totalSales = 0;
    orders.length > 0 &&
      orders.map((order) => {
        totalSales += order.total;
      });
    return totalSales;
  }

  render() {
    const { customer_order } = this.props;
    return (
        <>
          {customer_order && (
              <div className="row mt-4 status  text-capitalize">
                <div className="col-md-6 col-lg-3 mb-md-3 mb-sm-20">
                  <div className="card">
                    <div className="card-header">Total orders</div>
                    <div className="card-body text-center">
                      <h3>{customer_order['new'].number_of_orders+customer_order['returning'].number_of_orders}</h3>
                      <p className="mb-0">Orders completed</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-md-3 mb-sm-20">
                  <div className="card">
                    <div className="card-header">Total sales</div>
                    <div className="card-body text-center">
                      <h3>BDT {customer_order['new'].total_sales+customer_order['returning'].total_sales}</h3>
                      <p className="mb-0">Sales</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 mb-sm-20">
                  <div className="card">
                    <div className="card-header">Average basket value</div>
                    <div className="card-body text-center">
                      <h3>BDT {((customer_order['new'].total_sales+customer_order['returning'].total_sales)/(customer_order['new'].number_of_orders+customer_order['returning'].number_of_orders) || 0).toFixed(2)}</h3>
                      <p className="mb-0">Average basket value</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="card">
                    <div className="card-header">Average order rating</div>
                    <div className="card-body text-center">
                      <h3>N/A</h3>
                      <p className="mb-0">Average order rating score</p>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders,
  subdomain: state.login_auth.user.sub_domain,
});

export default connect(mapStateToProps, { getRestaurantOrder })(Status);
