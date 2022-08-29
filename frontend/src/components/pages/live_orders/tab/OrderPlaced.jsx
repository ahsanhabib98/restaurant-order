import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

function refactorOrder(order) {
  return {
    id: order.id,
    username: order.user?.first_name,
    branding: order.brand_name,
    phone_number: order.customer_phone,
    orderStatus: order.order_status,
    quantity: order.order_items?.reduce((base, newVal) => {
      return base + newVal.quantity;
    }, 0),
  };
}

const OrderPlaced = ({ orders, status, handleOrderStatusChange }) => {
  // console.log(orders);

  return (
    <div className="orderTabContent table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            {/* <th>Username</th> */}
            <th>Brand</th>
            {/* <th>Outlet 1</th> */}
            {/*<th>*/}
            {/*  <div className="dropdown filter-dropdown">*/}
            {/*    <button*/}
            {/*      className="btn"*/}
            {/*      type="button"*/}
            {/*      id="dropdownMenuButton"*/}
            {/*      data-toggle="dropdown"*/}
            {/*      aria-haspopup="true"*/}
            {/*      aria-expanded="false"*/}
            {/*    >*/}
            {/*      Branding*/}
            {/*      <span className="text-muted ml-2">*/}
            {/*        <FontAwesomeIcon icon={faFilter} />*/}
            {/*      </span>*/}
            {/*    </button>*/}
            {/*    <div*/}
            {/*      className="dropdown-menu"*/}
            {/*      aria-labelledby="dropdownMenuButton"*/}
            {/*      onClick={(e) => e.stopPropagation()}*/}
            {/*    >*/}
            {/*      <div className="dropdown-header">*/}
            {/*        <h6>Filter Outlet</h6>*/}
            {/*      </div>*/}

            {/*      <div className="checkbox-list">*/}
            {/*        <p className="form-check">*/}
            {/*          <label*/}
            {/*            className="form-check-label"*/}
            {/*            htmlFor="defaultCheck1"*/}
            {/*          >*/}
            {/*            <input*/}
            {/*              className="form-check-input"*/}
            {/*              type="checkbox"*/}
            {/*              value=""*/}
            {/*              id="defaultCheck1"*/}
            {/*            />*/}
            {/*            Dhanmondi*/}
            {/*          </label>*/}
            {/*        </p>*/}
            {/*        <p className="form-check">*/}
            {/*          <label*/}
            {/*            className="form-check-label"*/}
            {/*            htmlFor="defaultCheck2"*/}
            {/*          >*/}
            {/*            <input*/}
            {/*              className="form-check-input"*/}
            {/*              type="checkbox"*/}
            {/*              value=""*/}
            {/*              id="defaultCheck2"*/}
            {/*            />*/}
            {/*            Bashabo*/}
            {/*          </label>*/}
            {/*        </p>*/}
            {/*        <p className="form-check">*/}
            {/*          <label*/}
            {/*            className="form-check-label"*/}
            {/*            htmlFor="defaultCheck3"*/}
            {/*          >*/}
            {/*            <input*/}
            {/*              className="form-check-input"*/}
            {/*              type="checkbox"*/}
            {/*              value=""*/}
            {/*              id="defaultCheck3"*/}
            {/*            />*/}
            {/*            Jatrabari*/}
            {/*          </label>*/}
            {/*        </p>*/}
            {/*        <p className="form-check">*/}
            {/*          <label*/}
            {/*            className="form-check-label"*/}
            {/*            htmlFor="defaultCheck4"*/}
            {/*          >*/}
            {/*            <input*/}
            {/*              className="form-check-input"*/}
            {/*              type="checkbox"*/}
            {/*              value=""*/}
            {/*              id="defaultCheck4"*/}
            {/*            />*/}
            {/*            Mirpur*/}
            {/*          </label>*/}
            {/*        </p>*/}
            {/*        <p className="form-check">*/}
            {/*          <label*/}
            {/*            className="form-check-label"*/}
            {/*            htmlFor="defaultCheck5"*/}
            {/*          >*/}
            {/*            <input*/}
            {/*              className="form-check-input"*/}
            {/*              type="checkbox"*/}
            {/*              value=""*/}
            {/*              id="defaultCheck5"*/}
            {/*            />*/}
            {/*            Jigatola*/}
            {/*          </label>*/}
            {/*        </p>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</th>*/}
            <th>Items</th>
            <th>Phone Number</th>
            {status === "ORDER_PLACED" ? <th>Status</th> : <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((eachItem) => {
              const item = refactorOrder(eachItem);
              return (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  {/* <td>{item.username}</td> */}
                  <td>{item.branding}</td>
                  <td>{item.quantity}</td>
                  <td>{item.phone_number}</td>
                  {status === "ORDER_PLACED" ? (
                    item.orderStatus === "ORDER_PLACED" ? (
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            handleOrderStatusChange(item.orderStatus, item.id)
                          }
                        >
                          Next
                        </button>
                      </td>
                    ) : (
                      <td>{item.orderStatus}</td>
                    )
                  ) : (
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          handleOrderStatusChange(item.orderStatus, item.id)
                        }
                      >
                        Next
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default OrderPlaced;
