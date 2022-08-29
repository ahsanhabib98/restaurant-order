import FeatherIcon from "feather-icons-react";
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../bases/Header";
import PageTitle from "../../bases/PageTitle";
import Sidebar from "../../bases/Sidebar";
import DiscountTable from "./DiscountTable";
import {companyDiscountURL} from "../../../constants";

class Discounts extends Component {
  state = {
    discountList: []
  };

  componentDidMount() {
    document.title = "Discount | Onnow";
    this.handleFetchDiscountList();
  }

  handleFetchDiscountList = () => {
    axios.get(`${companyDiscountURL}`).then((res) => {
      this.setState({
        discountList: res.data
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    console.log(this.state.discountList);
    return (
      <div id="wrapper">
        <div className="navbar-nav">
          <Sidebar />
        </div>
        <div className="d-flex flex-column content_area">
          {/* <header> */}
          <Header />
          {/* </header> */}
          <div className="main_content">
            <div className="container-fluid ">
              {/* <PageTitle page_title="Discounts" /> */}

              {this.state.discountList.length > 0 ? (
                <DiscountTable discountList={this.state.discountList} />
              ) : (
                <div className="discount_intro text-center mt-5 pt-5">
                  <FeatherIcon icon="cpu" size="100" />
                  <h4>Let's create your first discount!</h4>
                  <p>
                    Create discounts to attract new customers, promote new
                    products for your existing customers, and increase your
                    sales.
                    <a className="learn_more" href="/">
                      <u>Learn more</u>
                    </a>
                  </p>
                  <Link
                    to="/create-discount"
                    className="btn btn-primary btn-discount"
                  >
                    Create Discount
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Discounts;
