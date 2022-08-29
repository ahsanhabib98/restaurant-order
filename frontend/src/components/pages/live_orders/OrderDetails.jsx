import React, { Component } from "react";
// import Order from "./Order";
import axios from "axios";
import OrderInfo from "./OrderInfo";
import OrderStatus from "./orderStatus";
import SearchOrder from "./SearchOrder";
import { orderURL } from "../../../constants";
import OrderPlaced from "./tab/OrderPlaced";
import { connect } from "react-redux";

const orderStatus = {
  ORDER_CREATED: "ORDER_CREATED",
  ORDER_PLACED: "ORDER_PLACED",
  CUSTOMER_CONFIRMED: "CUSTOMER_CONFIRMED",
  RIDER_CONFIRMED: "RIDER_CONFIRMED",
  PREPARING: "PREPARING",
  WAITING: "WAITING",
  DISPATCHED: "DISPATCHED",
  DELIVERY: "DELIVERY",
};

const orderStatusName = {
  ORDER_CREATED: "Order Created",
  ORDER_PLACED: "Order Placed",
  CUSTOMER_CONFIRMED: "Customer Confirmed",
  RIDER_CONFIRMED: "Rider Confirmed",
  PREPARING: "Preparing",
  WAITING: "Waiting",
  DISPATCHED: "Dispatched",
  DELIVERY: "Delivery",
};

const nextStatus = {
  [orderStatus.ORDER_CREATED]: orderStatus.CUSTOMER_CONFIRMED,
  [orderStatus.ORDER_PLACED]: orderStatus.CUSTOMER_CONFIRMED,
  [orderStatus.CUSTOMER_CONFIRMED]: orderStatus.RIDER_CONFIRMED,
  [orderStatus.RIDER_CONFIRMED]: orderStatus.PREPARING,
  [orderStatus.PREPARING]: orderStatus.WAITING,
  [orderStatus.WAITING]: orderStatus.DISPATCHED,
  [orderStatus.DISPATCHED]: orderStatus.DELIVERY,
};

class OrderDetails extends Component {
  state = {
    isListShow: true,
    orderDetail: null,
    orderStatus: orderStatus.ORDER_PLACED,
    orderDetailID: "",
    order: {},
    meta: [
      { status: orderStatus.ORDER_PLACED, label: "Order Placed", total: 0 },
      {
        status: orderStatus.CUSTOMER_CONFIRMED,
        label: "Customer Confirmed",
        total: 0,
      },
      {
        status: orderStatus.RIDER_CONFIRMED,
        label: "Rider Confirmed",
        total: 0,
      },
      { status: orderStatus.PREPARING, label: "Preparing", total: 0 },
      { status: orderStatus.WAITING, label: "Waiting", total: 0 },
      { status: orderStatus.DISPATCHED, label: "Dispatched", total: 0 },
    ],
  };

  orderStatusChangeSuccess = (currentStatus, response) => {
    const order = { ...this.state.order };
    const meta = [...this.state.meta];
    const currentObj = order[currentStatus];
    let nextObj = order[nextStatus[currentStatus]];
    if (!nextObj) {
      nextObj = {
        count: 1,
        results: [],
      };
    }
    nextObj.results.push(response);

    if (currentStatus !== orderStatus.ORDER_PLACED) {
      // console.log(`--${currentStatus}--`); // TODO: need to solve
      currentObj.results.splice(
        currentObj.results.findIndex((each) => each.id === response.id),
        1
      );
    }
    for (let i = 0; i < meta.length; i++) {
      if (currentStatus === meta[i].status) {
        meta[i].total--;
      } else if (nextStatus[currentStatus] === meta[i].status) {
        meta[i].total++;
      }
    }
    this.setState({
      ...this.state,
      order: order,
      meta: meta,
    });
  };

  handleOrderStatusChange = (currentStatus, orderID) => {
    const url = `${orderURL}/${orderID}/?subdomain=${this.props.subdomain}`;
    // console.log("handleOrderStatusChange: ", currentStatus, orderID);
    const payload = {
      order_status: nextStatus[currentStatus],
    };
    axios
      .patch(url, payload)
      .then((res) => {
        this.orderStatusChangeSuccess(currentStatus, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  cancelOrder = (orderID) => {
    if (!window.confirm("Do you want to Cancel?")) {
      return;
    }
    // .then((res) => {
    //   console.log("Order Cancelled");
    // })
    axios
      .patch(`${orderURL}/${orderID}/?subdomain=${this.props.subdomain}`, {
        order_status: "ORDER_CANCELLED",
      })
      .catch((err) => {
        console.log(err);
      });
  };
  confirmOrder = (orderID) => {
    if (!window.confirm("Do you want to confirm?")) {
      return;
    }
    axios
      .patch(`${orderURL}/${orderID}/?subdomain=${this.props.subdomain}`, {
        order_status: "ORDER_PLACED",
      })
      .then((res) => {
        // console.log("Order Placed");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handlePopupOrder = (orderID) => {
    console.log("handlePopupOrder: ", orderID, this.state.isListShow);

    if (this.state.isListShow===false) { // showing details
      if (this.state.orderDetailID === orderID) {
        console.log("state to true and set id null");
        this.setState({
          ...this.state,
          isListShow: true,
          orderDetailID: null,
        });
      } else {
        this.setState({
          ...this.state,
          isListShow: false,
          orderDetailID: orderID,
        });
      }
    } else { // showing list
      this.setState({
        ...this.state,
        isListShow: false,
        orderDetailID: orderID,
      });
    }
  };
  getActiveOrders() {
    if (this.state.order[this.state.orderStatus]) {
      return this.state.order[this.state.orderStatus].results;
    }
    return [];
  }

  fetchOrder(status) {
    if (this.state.order[status]) {
      this.setState({
        ...this.state,
        orderStatus: status,
      });
      return;
    }
    let url = `${orderURL}/?order_status=${status}&subdomain=${this.props.subdomain}`; // TODO: all to specific subdomain

    axios
      .get(url)
      .then((res) => {
        this.setState({
          ...this.state,
          orderStatus: status,
          order: {
            ...this.state.order,
            [status]: res.data,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getMetaData() {
    axios
      .get(`${orderURL}/meta/?subdomain=${this.props.subdomain}`) // TODO: all to specific subdomain
      .then((res) => {
        const meta = [...this.state.meta];
        for (let i = 0; i < meta.length; i++) {
          const find = res.data.find((each) => each.status === meta[i].status);
          if (find) {
            meta[i].total = find.total;
          }
        }
        this.setState({
          ...this.state,
          meta: meta,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getMetaData();
    this.fetchOrder(this.state.orderStatus);
    this.fetchOrder(orderStatus.ORDER_CREATED);
  }

  render() {
    console.log(this.state.orderDetailID);

    return (
      <div className="live_order_tab_section">
        <div className="tabbar">
          <ul className="nav nav-tabs nav_tabs">
            {this.state.meta.map((each, idx) => {
              return (
                <li className="nav-item nav-item-all" key={"status-" + idx}>
                  {each.id}
                  <a
                    className={`nav-link ${
                      each.status == this.state.orderStatus ? "active" : ""
                    }`}
                    data-toggle="tab"
                    href={`#${each.status}`}
                    onClick={() => this.fetchOrder(each.status)}
                  >
                    {each.label} <sup>{each.total}</sup>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="row live_order_tab_border d-fle">
            <div className="col-md-3 search leftCol">
              <SearchOrder />
              <OrderStatus
                handlePopupOrder={this.handlePopupOrder}
                orders={this.state.order[orderStatus.ORDER_CREATED]}
              />
            </div>
            <div className="col-md-9 boxShadowRight rightCol">
              {this.state.isListShow ? (
                <div className="tab-content">
                  <div id={this.state.orderStatus} className="tab-pane active">
                    <OrderPlaced
                      status={this.state.orderStatus}
                      orders={this.getActiveOrders()}
                      handleOrderStatusChange={this.handleOrderStatusChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="tab-content">
                  <div
                    className="tab-pane fade "
                    id={`order_${this.state.orderDetailID}`}
                  >
                    <OrderInfo
                      order={this.state.order[orderStatus.ORDER_CREATED]?.results.find((order) => order.id===this.state.orderDetailID)}
                      orderStatusName={orderStatusName}
                      orderID={this.state.orderDetailID}
                      handlePopupOrder={this.handlePopupOrder}
                      cancelOrder={this.cancelOrder}
                      confirmOrder={this.confirmOrder}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login_auth.user.token,
    subdomain: state.login_auth.subdomain,
  };
};

export default connect(mapStateToProps)(OrderDetails);
