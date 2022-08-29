import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import { useSelector } from "react-redux";
import Switch from "react-switch";

const OrderList = () => {
  const companyDetails = useSelector((state) => state.company);
  const { company } = companyDetails;
  const [isAcceptDelivery, setAcceptDelivery] = useState(true);

  // console.log(company);

  return (
    <div className="row mb-3">
      <div className="col-md-6">
        <div className="card p-3">
          <div id="pauseOrderListCollapse">
            <div className="d-flex justify-content-between align-items-center">
              <a
                href="0"
                className="btn btn-link p-0 text-left"
                data-toggle="collapse"
                data-target="#pauseOrderList"
                aria-expanded="true"
                aria-controls="pauseOrderListCollapse"
              >
                <div className="">
                  <small className="text-muted">Restaurant Name</small>
                  <h6 className="mb-0">
                    {companyDetails ? company && company.name : "Company Name"}
                  </h6>
                </div>
              </a>

              <div className="">
                <FeatherIcon
                  icon="circle"
                  size="10"
                  className={`${
                    isAcceptDelivery ? "icon-green" : "icon-red"
                  } border-0 mr-2`}
                  color={isAcceptDelivery ? "green" : "red"}
                />
                <span className="text-muted">Delivery</span>
              </div>
              {/* <div className="col-md-2 mt-3 ">
                  <FeatherIcon
                    icon="circle"
                    size="10"
                    color="red"
                    className="icon-red mr-2"
                  />
                  <small className="text-muted">
                    <span>Pick up</span>
                  </small>
                </div>
                <div className="col-md-2 mt-3 ">
                  <FeatherIcon
                    icon="circle"
                    size="10"
                    color="green"
                    className="icon-green mr-2"
                  />
                  <small className="text-muted">
                    <span>Dine in</span>
                  </small>
                </div> */}
            </div>

            <div
              id="pauseOrderList"
              className="collapse hide mt-3"
              aria-labelledby="headingOne"
              data-parent="#pauseOrderListCollapse"
            >
              <div className="d-flex align-items-center">
                <Switch
                  className="react-switch"
                  id="material-switch"
                  onChange={(e) => setAcceptDelivery(!isAcceptDelivery)}
                  checked={isAcceptDelivery}
                  // onColor="#86d3ff"
                  // onHandleColor="#2693e6"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  offColor="#ff0000"
                  boxShadow="0px 0px 3px rgba(0, 0, 0, 0.4)"
                  activeBoxShadow="0px 0px 3px rgba(0, 0, 0, 0.4)"
                  height={16}
                  width={42}
                />
                <p className="mb-0 ml-2">Accepting Delivery orders</p>
              </div>
              {/* <div className="row custom_switch">
                <div className="col-md-2">
                  <label className="switch">
                    <input type="checkbox" id="togBtn" />
                    <div className="slider round"></div>
                  </label>
                </div>
                <div className="col-md-5 mt-1 pl-0">
                  Accepting Delivery orders
                </div>
              </div>
              <div className="row custom_switch">
                <div className="col-md-2">
                  <label className="switch">
                    <input type="checkbox" id="togBtn" />
                    <div className="slider round"></div>
                  </label>
                </div>
                <div className="col-md-5 mt-1 pl-0">
                  Accepting Pickup orders
                </div>
              </div>
              <div className="row custom_switch">
                <div className="col-md-2">
                  <label className="switch">
                    <input type="checkbox" id="togBtn" />
                    <div className="slider round"></div>
                  </label>
                </div>
                <div className="col-md-5 mt-1 pl-0">
                  Accepting Dine-in orders
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
