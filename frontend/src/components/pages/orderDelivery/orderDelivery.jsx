import React, { Component } from "react";
import OrderFooter from "./OrderFooter";
import OrderHeader from "./OrderHeader";
import CustomModal from "../modal/CustomModal";
import FeatherIcon from "feather-icons-react";
import LocationList from "../delivery/locationList";
import SearchArea from "../delivery/searchArea";
import axios from "axios";
import {
  addressURL,
  addToCartURL,
  brandingWiseCompanyURL,
  customerURL,
  InventoryURL,
  marketingBrandURL,
  orderSummaryURL,
  orderUpdateURL,
  outLetURL,
  paymentURL,
  removeFalseOrder,
  sendOtpCodeURL,
  smsGetWayURL,
} from "../../../constants";
import ItemsInfo from "./../delivery/items/itemsInfo";
import ItemList from "../../pages/delivery/items";
import { ItemDetail } from "../delivery/items/itemDetail";
import Basket from "../delivery/basket";
import AddedToBasket from "./steps/AddedToBasket";
import LoginForm from "./../auth/login/loginForm";
import Signup from "./../auth/registration/Signup";
import UserRegistration from "./../auth/registration/UserRegistration";
import CustomerOTPAdd from "./../auth/otp/CustomerOtpAdd";
import OrderCartDetails from "./steps/OrderCartDetails";
import OrderBeignConfirmed from "./steps/OrderBeignConfirmed";
import DeliveryTime from "./steps/DeliveryTime";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import { getItemList, clearItemList } from "../../../utils";
import Auth from "../auth/otp/auth";
import PaymentInfo from "./steps/PaymentInfo";
import OrderCancel from "./steps/OrderCancel";
import styled from "styled-components";

class OrderDelivery extends Component {
  state = {
    dynamicColor: false,
    base_color: "",
    text_color: "",
    title: "",
    message: "",
    cover_photo: "",
    currentStep: 1,
    itemID: "",
    locationID: "",
    outletID: "",
    customer: {
      phone_number: "",
      branding: [],
      is_verify: false,
      otp_code: "",
      address: "",
    },
    data: {
      order_items: [],
    },
    outlets: [],
    outlet: null,
    address: "",
    error: null,
    loading: false,
    paymentMethod: "",
    domain_url: "",
    company: "",
    discount: null,
    sumOfItems: 0,
  };

  getPaymentMethod = (payment_method) => {
    this.setState({ paymentMethod: payment_method });
  };

  componentDidMount() {
    document.title = "Order Cart | Onnow";
    // document.title = "Onnow by Ghost Kitchen Bangladesh";

    const order_items = getItemList();

    const countItem = order_items.map((item) => {
      return item.count;
    });

    this.setState({
      sumOfItems: countItem.reduce((a, b) => a + b, 0),
    });

    try {
      const s = this.props.history.location.search;
      const search_list = s
        .slice(1)
        .split("&")
        .map((st) => st.split("="));
      const status = search_list[0][0];
      const order = search_list[1][1];

      localStorage.setItem("status", status);
      localStorage.setItem("order", order);
      if (status === "success") {
        this.setState({
          currentStep: 10,
        });
      } else {
        this.setState({
          currentStep: 12,
        });
      }
    } catch (e) {
      console.log(e);
    }
    const root = document.documentElement;
    const subdomain = window.location.host.split(".")[0];

    axios
      .get(`${marketingBrandURL}?subdomain=${subdomain}`)
      .then(({ data }) => {
        // console.log(data);
        if (data.length) {
          const {
            branding,
            base_color,
            text_color,
            title,
            message,
            cover_photo,
          } = data[0];

          this.setState({
            customer: {
              ...this.state.customer,
              branding: [branding],
            },
            base_color,
            text_color,
            title,
            message,
            cover_photo,
          });

          // console.log("Fetch data: ", data[0]);
          // console.log("base_color: ", this.state.base_color);
          // console.log("text_color: ", this.state.text_color);

          root?.style.setProperty(
            "--primary",
            this.state.base_color ? this.state.base_color : "#f05a22"
          );

          root?.style.setProperty(
            "--secondary",
            this.state.text_color ? this.state.text_color : "#444444"
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
    this.handleFetchCompany(subdomain);
    this.handleFetchOutlet(subdomain);
    this.setState({
      domain_url: window.location.href,
    });
  }

  handleFetchCompany = (subdomain) => {
    axios
      .get(brandingWiseCompanyURL(subdomain))
      .then((res) => {
        this.setState({
          company: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          error: "You currently do not have an discount",
          loading: false,
        });
      });
  };

  handleFetchOutlet = (subdomain) => {
    axios
      .get(`${outLetURL}?subdomain=${subdomain}`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ outlets: res.data });
      })
      .catch((err) => {
        this.setState({
          error: "You currently do not have an outlet",
          loading: false,
        });
      });
  };

  handleFetchOrder = () => {
    this.setState({ loading: true });
    axios
      .get(
        `${orderSummaryURL}?phone_number=${this.state.customer.phone_number}`
      )
      .then((res) => {
        this.setState({ ...this.state, data: res.data, loading: false });
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            this.setState({
              error: "You currently do not have an order",
              loading: false,
            });
          } else {
            this.setState({ error: err, loading: false });
          }
        }
      });
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 12 ? 13 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  /*
   * the functions for our button
   */
  previousButton() {
    let currentStep = this.state.currentStep;
    // if (currentStep !== 1 && currentStep < 4) {
    if (currentStep !== 1) {
      return (
        <button className="btn btn-default" type="button" onClick={this._prev}>
          Previous
        </button>
      );
    }
    return null;
  }

  nextButton = () => {
    let currentStep = this.state.currentStep;
    if (currentStep < 12) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={this._next}
        >
          Next
        </button>
      );
    }
    return null;
  };

  handleLocation = (locationID, currentStep) => {
    const outlet = this.state.outlets.find((obj) => {
      return obj.delivery_area.some((areaID) => areaID === locationID);
    });
    this.setState({
      outlet: outlet,
      outletID: outlet.id,
      locationID: locationID,
      currentStep: currentStep,
    });
    this._next();
  };

  handleItems = (itemID, currentStep) => {
    this.setState({
      itemID: itemID,
      currentStep: currentStep,
    });
    this._next();
  };

  handleBasket = () => {
    this.setState({ currentStep: 4 });
  };

  handleAddBasket = () => {
    this.setState({ currentStep: 2 });
  };

  handleReviewBasket = () => {
    this.setState({ currentStep: 5 });
  };

  handleReviewOrder = () => {
    this.setState({ currentStep: 6 });
  };

  handlePhoneChange = (e) => {
    this.setState({
      customer: {
        ...this.state.customer,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleFetchCustomer = async () => {
    const { customer } = this.state;
    try {
      const { branding } = customer;
      const get_res = await axios.get(
        `${customerURL}${customer.phone_number}/`
      );
      get_res.data.branding.push(branding[0]);
      const put_res = await axios.put(
        `${customerURL}${customer.phone_number}/`,
        get_res.data
      );
      this.setState({ customer: put_res.data });
    } catch (err) {
      if (err.response.status === 404) {
        const res = await axios.post(`${customerURL}`, customer);
        this.setState({ customer: res.data });
      }
    }
  };

  sendOtpCodeHandler = () => {
    const { customer } = this.state;
    const otp_code = ("" + Math.random()).substring(2, 7);
    axios
      .put(`${customerURL}${customer.phone_number}/`, { otp_code: otp_code })
      .then((res) => {
        this.setState({ customer: res.data });
      })
      .catch((err) => {
        this.setState({ error: err });
      });

    axios.get(smsGetWayURL(customer.phone_number, otp_code)).catch((err) => {
      this.setState({ error: err });
    });
  };

  handleSendCode = async (e) => {
    e.preventDefault();
    await this.handleFetchCustomer();
    await this.sendOtpCodeHandler();
    this.setState({ currentStep: 7 });
  };

  handleRemoveFalseOrder = async () => {
    const { customer } = this.state;
    await axios.post(`${removeFalseOrder}`, {
      phone_number: customer.phone_number,
    });
  };

  handleFetchCustomerOrder = async () => {
    const items = getItemList();
    const locationID = this.state.locationID;
    const outletID = this.state.outlet.id;
    const phone_number = this.state.customer.phone_number;
    for (let i = 0; i < items.length; i++) {
      const itemID = items[i].id;
      for (let j = 0; j < items[i].count; j++) {
        await axios.post(addToCartURL, {
          locationID,
          itemID,
          outletID,
          phone_number,
        });
      }
    }
    await this.handleFetchOrder();
  };

  handleOTPVerify = async () => {
    await this.handleRemoveFalseOrder();
    await this.handleFetchCustomerOrder();
    clearItemList();
    this.setState({ currentStep: 8 });
  };

  handleFetchAddress = async (address) => {
    const { customer } = this.state;
    if (customer.address) {
      const res = await axios.put(
        `${addressURL}${customer.address.id}/`,
        address
      );
      this.setState({
        address: res.data,
      });
    } else {
      address.customer = customer.id;
      const res = await axios.post(`${addressURL}`, address);
      this.setState({
        address: res.data,
      });
    }
    const res = await axios.get(
      `${customerURL}${this.state.customer.phone_number}/`
    );
    this.setState({ customer: res.data });
  };

  handleEditAddress = () => {
    this.setState({ currentStep: 9 });
  };

  handleAddressSave = async (address) => {
    await this.handleFetchAddress(address);
    this.setState({ currentStep: 8 });
  };

  handleUpdateOrder = async (total) => {
    const res = await axios.put(orderUpdateURL(this.state.data.id), {
      ordered: true,
      total_payment: total,
    });
    this.setState({
      data: res.data,
    });
  };

  handleConfirmOrder = async (total) => {
    if (this.state.paymentMethod === "CASH_ON_DELIVERY") {
      await this.handleUpdateOrder(total);
      this.setState({ currentStep: 10 });
    } else {
      await this.handleUpdateOrder(total);
      await this.handlePayment(total);
    }
  };

  handlePayment = async (total) => {
    const customer_info = {
      amount: total,
      addressID: this.state.customer.address.id,
      domain_url: this.state.domain_url,
      desc: this.state.data,
      orderID: this.state.data.id,
    };
    const res = await axios.post(paymentURL, customer_info);
    window.location.href = JSON.parse(res.data[0])["payment_url"];
  };

  render() {
    const { currentStep, order_items } = this.state;
    const Button = styled.button`
      transition: 0.4s;

      &:hover {
        background: ${this.state.base_color} !important;
        opacity: 0.8;import { styled } from 'styled-components';

      }
    `;

    // console.log(countItem);
    console.log(this.state.sumOfItems);

    return (
      <>
        <div className="delivery-right-panel delivery-modal border-left ml-auto">
          <div className="delivery-header d-flex justify-content-between align-items-center p-3 border-bottom text-muted">
            <h6 className="text-uppercase d-flex align-items-center font-weight-semibold text-dark mb-0">
              {currentStep !== 1 && currentStep !== 6 && currentStep !== 7 && (
                <button
                  className="btn bg-white btn-sm p-0 mr-2"
                  onClick={
                    currentStep === 5
                      ? () => window.location.reload()
                      : this._prev
                  }
                >
                  <span>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </span>
                </button>
              )}
              Order Cart
            </h6>

            {/* {currentStep === 4 && (
              <div className="btn btn-primary">
                <span className="mr-1">
                  <FontAwesomeIcon icon={faShoppingBasket} />
                </span>
                Cart
                <span className="badge badge-light ml-2">4</span>
              </div>
            )} */}
          </div>

          <div className="delivery-body">
            {currentStep < 3 && (
              <div className="img-box mb-3">
                {this.state.cover_photo ? (
                  <img src={this.state.cover_photo} alt="" />
                ) : (
                  <img
                    src={
                      window.location.origin +
                      "/media/delivery_header_banner.jpeg"
                    }
                    alt=""
                  />
                )}
              </div>
            )}

            {/* Step 01 */}
            {currentStep === 1 && (
              <div className="step step1">
                <div className="px-3 pb-3">
                  <SearchArea />
                  <LocationList handleLocation={this.handleLocation} />
                </div>
              </div>
            )}

            {/* Step 02 */}
            {currentStep === 2 && (
              <div className="step step2">
                <div className="delivery_main">
                  <ItemList
                    locationID={this.state.locationID}
                    handleItems={this.handleItems}
                  />

                  {getItemList()?.length ? (
                    <div className="btn-container px-3 my-">
                      {/* {this.previousButton()} */}

                      <Button
                        className="btn btn-primary w-100 reviewBasketBtn btn-lg"
                        onClick={this.handleReviewBasket}
                      >
                        <span className=" font-weight-bold">
                          <FeatherIcon icon="shopping-cart" size="18" />
                          <sub>{this.state.sumOfItems}</sub>
                        </span>
                        Review Basket
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            {/* Step 03 */}
            {currentStep === 3 && (
              <div className="step step3">
                <ItemDetail
                  locationID={this.state.locationID}
                  itemID={this.state.itemID}
                  handleBasket={this.handleBasket}
                  text_color={this.state.text_color}
                  base_color={this.state.base_color}
                  // previousButton={this.previousButton()}
                />
              </div>
            )}

            {/* Step 04 */}
            {currentStep === 4 ? (
              <div className="step step4">
                <AddedToBasket
                  handleAddBasket={this.handleAddBasket}
                  handleReviewBasket={this.handleReviewBasket}
                  base_color={this.state.base_color}
                />
              </div>
            ) : null}

            {/* Step 04 */}
            {currentStep === 5 ? (
              <div className="step step4">
                <Basket
                  locationID={this.state.locationID}
                  handleReviewOrder={this.handleReviewOrder}
                  outlet={this.state.outlet}
                  company={this.state.company}
                  base_color={this.state.base_color}
                />

                {/* previous btn */}
                {/* {this.previousButton()} */}
              </div>
            ) : null}

            {currentStep === 6 ? (
              <div className="step step4">
                <div className="p-4">
                  <Auth
                    handlePhoneChange={this.handlePhoneChange}
                    handleSendCode={this.handleSendCode}
                    base_color={this.state.base_color}
                  />
                </div>
              </div>
            ) : null}

            {currentStep === 7 ? (
              <div className="step step4">
                <div className="p-4">
                  <CustomerOTPAdd
                    customer={this.state.customer}
                    handleOTPVerify={this.handleOTPVerify}
                  />
                </div>
              </div>
            ) : null}

            {currentStep === 8 ? (
              <div className="step step4">
                <div className="p-4">
                  <OrderCartDetails
                    order={this.state.data}
                    customer={this.state.customer}
                    outlet={this.state.outlet}
                    paymentMethod={this.state.paymentMethod}
                    getPaymentMethod={this.getPaymentMethod}
                    handleEditAddress={this.handleEditAddress}
                    handleConfirmOrder={this.handleConfirmOrder}
                    company={this.state.company}
                    base_color={this.state.base_color}
                  />
                </div>
              </div>
            ) : null}

            {currentStep === 9 ? (
              <div className="step step4">
                <div className="p-4">
                  <PaymentInfo
                    handleAddressSave={this.handleAddressSave}
                    customer={this.state.customer}
                  />
                </div>
              </div>
            ) : null}

            {currentStep === 10 ? (
              <div className="step step4">
                <div className="p-4">
                  <OrderBeignConfirmed />
                </div>
              </div>
            ) : null}

            {/* Step 04 */}
            {currentStep === 11 ? (
              <div className="step step4">
                <DeliveryTime />
              </div>
            ) : null}

            {/* Step 04 */}
            {currentStep === 12 ? (
              <div className="step step4">
                <OrderCancel />
              </div>
            ) : null}

            {/*<div className="btn-container pt-0 mt-4">*/}
            {/*  /!* {this.previousButton()} *!/*/}
            {/*  {this.nextButton()}*/}
            {/*</div>*/}
          </div>
        </div>

        {/* <OrderHeader /> */}

        {/* <div className="order-main-content">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="order_content">
                  <h2 className="pb-3">Virtual Food Hall</h2>
                  <p>
                    We are coming soon as a logistics partner of Ghost Kitchen
                    Bangladesh to support its endless internet restaurant brand
                    concepts, which we will make available to everyone, all
                    within 30 minutes delivery.
                  </p>
                  <p>
                    With Onno App, you will also be able to mix n’ match your
                    favorite brands from Ghost Kitchen Bangladesh all from one
                    single platform.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="img-container">
                  <img
                    src={window.location.origin + "/media/Onno_Logo_pic.png"}
                    alt="logo"
                  />
                </div>
              </div>
            </div>
          </div>
          <OrderFooter />

          <div className="order-popup-container">
            <div className={`order-popup ${this.state.isClose && "d-none"}`}>
              <div className="outer-box">
                <div className="popup-header d-flex justify-content-between">
                  <h5>{this.state.title}</h5>
                  <button
                    className="btn btn-sm btn-default btnClose"
                    onClick={() => {
                      this.setState({ isClose: true });
                    }}
                  >
                    <span> &times; </span>
                  </button>
                </div>
                <p className="text-muted">{this.state.message}</p>
              </div>

              <div className="popup-footer d-flex justify-content-between align-items-center">
                <button className="btn btn-primary" onClick={this.handleShow}>
                  Order Now
                </button>

                <small className="poweredBy">
                  Powered by <span>Onnow </span>
                </small>
              </div>
            </div>
            <button
              className="btn btn-primary floating-btn border-0"
              onClick={() => this.setState({ isClose: !this.state.isClose })}
            >
              <img src={window.location.origin + "/icon/Icon1.png"} alt="" />
            </button>
          </div>
        </div> */}
      </>
    );
  }
}

export default OrderDelivery;
