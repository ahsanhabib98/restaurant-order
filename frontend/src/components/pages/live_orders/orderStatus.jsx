import React, { Component } from "react";
import FeatherIcon from "feather-icons-react";

class OrderStatus extends Component {
  render() {
    const orders = this.props.orders;
    // console.log(this.props.orders);

    return (
      <>
        <div className="order-status ">
          {this.props.orders?.results?.length ? (
            <div className="order-lists-view">
              <ul className="nav nav-tabs ">
                {/* {this.liveOrders(this.props.orders?.results)} */}

                {orders &&
                  orders.results.map((order, i) => (
                    <li className="p-0 border-0 w-100" key={"sidebar-" + i}>
                      <a
                        className="nav-link list "
                        data-toggle="tab"
                        href={`#order_${order.id}`}
                        onClick={() => this.props.handlePopupOrder(order.id)}
                        key={order.id}
                      >
                        <h6 className="order-id font-weight-bold">
                          #{order.id}
                        </h6>
                        <p>
                          {order?.user?.first_name + ", " + order.order_time}
                        </p>
                        <div className="status d-non"></div>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <div className="no-data">
              <FeatherIcon icon="shopping-cart" size="32" />
              <p>There is no pending order</p>
            </div>
          )}

          <button className="btn btn-refresh order_status_refresh">
            <span className="mr-2">
              <FeatherIcon icon="refresh-ccw" size="15" />
            </span>
            Refresh
          </button>
        </div>
      </>
    );
  }

  // liveOrders(results) {
  //   return results.map((order, key) => {
  //     return (
  //       // <div className="order-lists-view" key={order.id}>
  //       //   <ul className="nav nav-tabs ">
  //       <li className="p-0 border-0 w-100" key={order.id}>
  //         <a
  //           className="nav-link list "
  //           data-toggle="tab"
  //           href={`#order_${order.id}`}
  //           onClick={() => this.props.handlePopupOrder(order.id)}
  //         >
  //           <h6 className="order-id font-weight-bold">#{order.id}</h6>
  //           <p>{order?.user?.first_name + ", " + order.order_time}</p>
  //           <div className="status d-non"></div>
  //           {/* <div className="preparing text-center">
  //             <label>Prep in</label>
  //             <div className="min">
  //               <p className="mb-0 font-weight-bold">90</p>
  //               <small className="text-uppercase">min</small>
  //             </div>
  //           </div> */}
  //         </a>
  //       </li>
  //       //   </ul>
  //       // </div>
  //     );
  //   });
  // }
}

export default OrderStatus;
