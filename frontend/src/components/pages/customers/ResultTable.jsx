import React, { Component } from "react";
import Pagination from "./Pagination";

class ResultTable extends Component {
  getTotalAmount(orders) {
    return orders.reduce((base, obj) => base + obj.total_payment, 0);
  }
  render() {
    const { customers } = this.props;
    if (!customers?.length) return null;

    return (
      <div className="card table-responsive">
        <table className="table table-hover mb-0">
          <thead className="table-header">
            <tr>
              {/* <th scope="col">Name</th> */}
              <th scope="col">Phone number</th>
              <th scope="col">Orders Placed</th>
              <th scope="col">First Ordered At</th>
              <th scope="col">Last Ordered At</th>
              <th className="text-right" scope="col">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {customers &&
              customers.map((customer, i) => {
                return (
                  <tr key={customer.id}>
                    {/* <td>{customer.name}</td> */}
                    <td>
                      <a href="tel:+8801820736647">{customer.phone_number}</a>
                    </td>
                    <td>{customer.orders.length}</td>
                    <td>{customer.orders[0]?.start_date}</td>
                    <td>
                      {customer.orders[customer.orders.length - 1]?.start_date}
                    </td>
                    <td className="text-right">
                      BDT {this.getTotalAmount(customer.orders)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* <div className="row ml-0 mr-0 pt-3 pb-3 customPaginationComponent">
          <div className="col-md-6 pl-2">
            <p className="mb-0 ml-2 showing_text">
              Showing from 1 to 1 of 1 record.
            </p>
          </div>
          <div className="col-md-6 text-right pr-3">
            <Pagination />
          </div>
        </div> */}
      </div>
    );
  }
}

export default ResultTable;
