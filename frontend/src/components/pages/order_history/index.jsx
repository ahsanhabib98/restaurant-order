import React, { Component } from "react";
import axios from "axios";
import Header from "../../bases/Header";
import PageTitle from "../../bases/PageTitle";
import Sidebar from "../../bases/Sidebar";
import ResultsTable from "./ResultsTable";
import SearchBar from "./SearchBar";
import {orderHistoryList} from "../../../constants";

class OrderHistory extends Component {
  state = {
    orders: []
  }
  componentDidMount() {
    document.title = "Order History | Onnow";
    this.handleFetchOrderHistory();
  }

  handleFetchOrderHistory = () => {
    axios.get(`${orderHistoryList}`).then((res) => {
      this.setState({
        orders: res.data
      })
    })
  }

  render() {
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
            <div className="container-fluid">
              <PageTitle page_title="Order History" />
              <SearchBar />
              <br />
              <ResultsTable
                orders={this.state.orders}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderHistory;
