// import FeatherIcon from "feather-icons-react"
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Header from "../../../bases/Header";
import Sidebar from "../../../bases/Sidebar";
import Application from "./Application";
import DiscountFrom from "./DiscountFrom";
import OrderType from "./OrderType";
import ApplicableOutlets from "./ApplicableOutlets";
import FeatherIcon from "feather-icons-react";
import {
  companyDiscountURL,
  customerURL,
  restaurantDiscountURL,
} from "../../../../constants";

class CreateDiscount extends Component {
  state = {
    discountAmount: 0,
    isNeverExpired: false,
    selectedOption: "specificDate",
    discount: {
      company: "",
      name: "",
      code: "",
      type: "PERCENTAGE_VALUE",
      amount: "",
      minimum_order_value: "",
      maximum_discount: "",
      number_of_uses: "",
      start_date: null,
      start_time: null,
      end_date: null,
      end_time: null,
    },
  };

  // async getDiscount(company) {
  //   if (company.discount === null) {
  //     this.setState({
  //       discount: {
  //         ...this.state.discount,
  //         company: company.id,
  //       },
  //     });
  //   } else {
  //     const res = await axios.get(
  //       `${companyDiscountURL}${company.discount.id}/`
  //     );
  //     this.setState({
  //       discount: res.data,
  //     });
  //   }
  // }
  //
  // async componentWillReceiveProps(nextProps) {
  //   if (nextProps.company && !this.state.discount.company) {
  //     await this.getDiscount(nextProps.company);
  //   }
  // }

  componentDidMount() {
    document.title = "Create Discount | onnow";
    const { discountID } = this.props.match.params;
    if (discountID) {
      this.handleFetchDiscount(discountID);
    } else if (this.props.company) {
      this.setState({
        discount: {
          ...this.state.discount,
          company: this.props.company.id,
        },
      });
    }
  }

  handleFetchDiscount = (discountID) => {
    axios.get(`${companyDiscountURL}${discountID}/`).then((res) => {
      this.setState({
        discount: res.data
      })
    })
  }

  handleSaveDiscount = () => {
    const { discount } = this.state;
    axios.post(`${companyDiscountURL}`, discount).then((res) => {
      this.setState({ discount: res.data });
    })
  };

  handleDiscountSubmit = async (e) => {
    e.preventDefault();
    await this.handleSaveDiscount();
    this.props.history.push("/discounts");
  };

  onchangeHandler = (e) => {
    this.setState({
      discount: {
        ...this.state.discount,
        [e.target.name]: e.target.value,
      },
    });
  };
  render() {
    return (
      <div id="wrapper">
        <div className="navbar-nav">
          <Sidebar />
        </div>
        <div className="d-flex flex-column content_area">
          <header>
            <Header />
          </header>
          <div className="main_content">
            <div className="container-fluid ">
              <div className="row">
                <div className="col-lg-7">
                  <DiscountFrom
                    discount={this.state.discount}
                    onchangeHandler={this.onchangeHandler}
                  />
                  {/* <Application /> */}
                  {/* <OrderType /> */}
                  <ApplicableOutlets
                    discount={this.state.discount}
                    handleDiscountSubmit={this.handleDiscountSubmit}
                    onchangeHandler={this.onchangeHandler}
                  />
                </div>
                <div className="col-lg-5">
                  <div className="discount-box bg-gray">
                    <h4>Preview</h4>
                    <div className="preview-box">
                      <div className="preview-icon">
                        <FeatherIcon icon="tag" size="18" />
                      </div>
                      <div className="preview-content">
                        <h5 className="text-capitalize mb-1">
                          {this.state.discount && this.state.discount.name}
                        </h5>
                        <p>
                          {/* {`Get ${
                            this.state.discount && this.state.discount.name
                            } off all orders`} */}

                          {this.state.discount &&
                          this.state.discount.type === "PERCENTAGE_VALUE"
                            ? "Get " +
                              this.state.discount.amount +
                              "% off all orders"
                            : "Get " +
                              this.state.discount.amount +
                              " BDT off all orders"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  company: state.company.company,
});

export default connect(mapStateToProps, null)(CreateDiscount);
