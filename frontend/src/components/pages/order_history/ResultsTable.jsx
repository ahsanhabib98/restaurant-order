import React, { Component } from "react";
import { connect } from "react-redux";
import { getRestaurantOrder } from "../../../store/actions/restaurantOrderAction";
// import History from "./History"

class ResultTable extends Component {
  // componentDidMount() {
  //   this.props.getRestaurantOrder(this.props.subdomain);
  // }

  render() {
    const { orders } = this.props;
    console.log(orders);

    return (
      <div className="border rounded">
        {/* <div className="row p-4 p_bottom_0" data-test="summary"> */}
        {/* this item will render after search */}
        {/* <History /> */}
        {/* </div> */}
        <div className="relative">
          <div className="loading-zone table-responsive">
            <table className="table  table-hover m-0">
              <thead className="thead-light">
                <tr>
                  <th className="sorter minw-140">
                    <span>ID </span>
                  </th>
                  <th className="minw-150">Customer</th>
                  <th className="sorter minw-120">
                    <span>Total </span>
                  </th>
                  <th className="sorter minw-140">
                    <span>Outlet </span>
                  </th>
                  <th className="sorter minw-130">
                    <span>Ordered at </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order, index) => {
                    return (
                      <tr
                        key={index}
                        data-v-4664f7bc=""
                        data-test-line=""
                        className="cursor-pointer"
                        business-id="4aa501a2-d5f0-4a0b-bfce-e0da36e7c1cf"
                        data-v-64234646=""
                      >
                        <td>
                          <strong>#{order.id}</strong>
                          <small className="d-block"> </small>
                        </td>
                        <td> {order.customer_phone} </td>
                        <td>BDT&nbsp;{order.total_payment}</td>
                        <td>{order.outlet_name}</td>
                        <td>{order.ordered_date}</td>
                      </tr>
                    );
                  })}

                {/* <tr>
                  <td colspan="20" className="text-center">
                    No record found
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>

        {/* <div className="p-3">
          <div className="row">
            <div className="col-md text-center text-md-left my-2">
              Showing from 1 to 1 of 1 record.
            </div>
            <div className="col-md text-center text-md-right">
              <nav className="d-inline-block">
                <ul className="pagination justify-content-center mb-0">
                  <li className="page-item disabled">
                    <a href="#0" className="page-link">
                      <span aria-hidden="true">«</span>
                    </a>
                  </li>
                  <li className="page-item active">
                    <span className="page-link">
                      1<span className="sr-only">(current)</span>
                    </span>
                  </li>
                  <li className="page-item disabled">
                    <a href="#0" className="page-link">
                      <span aria-hidden="true">»</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  subdomain: state.login_auth.user.sub_domain,
});

export default connect(mapStateToProps, { getRestaurantOrder })(ResultTable);
