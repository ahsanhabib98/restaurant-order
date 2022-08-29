import FeatherIcon from "feather-icons-react";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getRestaurantOrder } from "../../../store/actions/restaurantOrderAction";

class CustomarTable extends Component {
  // componentDidMount() {
  //   this.props.getRestaurantOrder(this.props.subdomain);
  // }

  render() {
    const { customer_order } = this.props;
    console.log(customer_order);
    return (
      <div className="mt-4 cutomer_table">
        <div className="card ">
          <div className="table-card-header">
            <h5 className="card-title mb-0 commont_title">
              New customers X returning customers
            </h5>
          </div>
          <div className="card-body p-0 table-responsive">
            <table className="table table-hover table-lg mb-0">
              <thead>
                <tr className="table-header">
                  <td></td>
                  <td className="font-bold"># of orders</td>
                  <td className="font-bold"># of customers</td>
                  <td className="font-bold">% of customers</td>
                  <td className="font-bold">Ave.basket</td>
                  <td className="font-bold">Total sales</td>
                  <td className="font-bold">% Orders</td>
                  <td className="font-bold bg-deep">
                    ACV
                    <span
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Average Customers Value = Total Sales / Total Customers"
                    >
                      <FeatherIcon
                        icon="help-circle"
                        className="ml-2"
                        size="12"
                        strokeWidth="3px"
                      />
                    </span>
                  </td>
                </tr>
              </thead>
              <tbody>
                {customer_order && (
                    Object.keys(customer_order).map((key) => {
                      return (
                          <tr key={key} className={`${key === 'returning' && 'table-row-bg'}`}>
                            <td className="text-capitalize">{key}</td>
                            <td>{customer_order[key].number_of_orders}</td>
                            <td>{customer_order[key].number_of_customers}</td>
                            <td>{customer_order[key].percentage_of_customers.toFixed(2)}%</td>
                            <td>BDT {customer_order[key].avg_basket.toFixed(2)}</td>
                            <td>BDT {customer_order[key].total_sales.toFixed(2)}</td>
                            <td>{customer_order[key].percentage_of_orders.toFixed(2)}%</td>
                            <td className="font-bold bg-deep">BDT {customer_order[key].acv.toFixed(2)}</td>
                          </tr>
                      )
                    })
                )}
                {customer_order && (
                    <tr>
                      <td className="font-bold">Total</td>
                      <td className="font-bold">{customer_order['new'].number_of_orders+customer_order['returning'].number_of_orders}</td>
                      <td className="font-bold">{customer_order['new'].number_of_customers+customer_order['returning'].number_of_customers}</td>
                      <td className="font-bold">{(customer_order['new'].percentage_of_customers+customer_order['returning'].percentage_of_customers).toFixed(2)}%</td>
                      <td className="font-bold">BDT {((customer_order['new'].total_sales+customer_order['returning'].total_sales)/(customer_order['new'].number_of_orders+customer_order['returning'].number_of_orders) || 0).toFixed(2)}</td>
                      <td className="font-bold">BDT {(customer_order['new'].total_sales+customer_order['returning'].total_sales).toFixed(2)}</td>
                      <td className="font-bold">{(customer_order['new'].percentage_of_orders+customer_order['returning'].percentage_of_orders).toFixed(2)}%</td>
                      <td className="font-bold bg-deep">BDT {(customer_order['new'].acv+customer_order['returning'].acv).toFixed(2)}</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders,
  subdomain: state.login_auth.user.sub_domain,
});

export default connect(mapStateToProps, { getRestaurantOrder })(CustomarTable);
