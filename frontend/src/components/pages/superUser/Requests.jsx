import React, { Component } from "react";
import Sidebar from "./../../bases/Sidebar";
import BootstrapTable from "react-bootstrap-table-next";
import CustomModal from "./../modal/CustomModal";
import {
  accountDeleteURL,
  accountUpdateURL,
  companyRequestListURL,
} from "../../../constants";
import axios from "axios";
import Header from "./../../bases/Header";

import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";

class RestaurantRequests extends Component {
  state = {
    isModalOpen: false,
    data: [],
    restaurantRequestList: [],
  };

  componentDidMount() {
    this.getResturentRequestList();
  }

  handleAccept = (userID) => {
    if (!window.confirm("Accept the company?")) {
      return;
    }
    axios.put(accountUpdateURL(userID), { is_active: true }).then((res) => {
      // alert("Accepted");
      const currentList = this.state.restaurantRequestList.filter(
        (obj) => obj.user_id !== userID
      );
      this.setState({ restaurantRequestList: [...currentList] });
    });
  };
  handleReject = (userID) => {
    if (!window.confirm("Delete the company?")) {
      return;
    }
    axios.delete(accountDeleteURL(userID)).then((res) => {
      const currentList = this.state.restaurantRequestList.filter(
        (obj) => obj.user_id !== userID
      );
      this.setState({ restaurantRequestList: [...currentList] });
    });
  };
  getResturentRequestList() {
    axios
      .get(companyRequestListURL)
      .then(({ data }) => {
        this.setState({ restaurantRequestList: data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getColumns() {
    return [
      {
        dataField: "id",
        text: "SL No.",
        sort: true,
      },
      {
        dataField: "company_name",
        text: "Company Name",
        sort: true,
      },
      {
        dataField: "email",
        text: "	Email ",
        sort: true,
      },
      {
        dataField: "phone_number",
        text: "Phone Number",
        sort: true,
      },
      {
        dataField: "verify",
        text: "Verify",
        sort: true,
      },
    ];
  }

  customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  options() {
    return {
      custom: true,
      totalSize: this.state.data.length,
    };
  }

  getRows() {
    return this.state.restaurantRequestList.map((restaurant, idx) => {
      return {
        id: idx,
        company_name: restaurant.name,
        email: restaurant.email,
        phone_number: restaurant.phone_number,
        verify: (
          <div className="btn-container p-0">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => this.handleAccept(restaurant.user_id)}
            >
              Yes
            </button>
            <button
              className="btn btn-default btn-sm"
              onClick={() => this.handleReject(restaurant.user_id)}
            >
              No
            </button>
          </div>
        ),
      };
    });
  }

  handleClose = () => this.setState({ isModalOpen: false });

  handleShow = () => {
    return this.setState({
      isModalOpen: true,
    });
  };

  render() {
    return (
      <div id="wrapper" className="super-admin">
        <div className="navbar-nav">
          <Sidebar />
        </div>
        <div className="d-flex flex-column content_area">
          <div className="super-user-wrapper">
            <Header />

            {/* <div className="main-heading border-bottom py-3">
              <div className="container-fluid">
                <h3 className="custom-text-primary font-weight-bold mb-0">
                  Requests
                </h3>
              </div>
            </div> */}
            <div className="main-content">
              <div className="container-fluid">
                <h4 className="text-muted font-weight-bol mb-0 mt-4">
                  Requests
                </h4>

                <div className="customers-info mt-4">
                  {/* <h5 className="text-dark text-capitalize font-weight-bold mb-3">
                    New customers X returning customers
                  </h5> */}

                  {/* <BootstrapTable
                    bootstrap4
                    keyField="id"
                    data={this.getRows()}
                    columns={this.getColums()}
                  /> */}

                  <PaginationProvider
                    pagination={paginationFactory(this.options())}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <div>
                        <BootstrapTable
                          bootstrap4
                          keyField="id"
                          data={this.getRows()}
                          columns={this.getColumns()}
                          {...paginationTableProps}
                        />

                        {this.state.data.length > 0 && (
                          <div className="d-flex justify-content-between align-items-center">
                            <PaginationTotalStandalone {...paginationProps} />
                            <PaginationListStandalone {...paginationProps} />
                          </div>
                        )}
                      </div>
                    )}
                  </PaginationProvider>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CustomModal
          title="Confirmation"
          isModalOpen={this.state.isModalOpen}
          handleClose={this.handleClose}
        >
          <div className="p-3">
            <h3 className="font-weight-bold">
              Are you Sure to Delete Request?
            </h3>
            <div className="btn-container p-0 mt-4">
              <button className="btn btn-default">Cancel</button>
              <button className="btn btn-primary">Yes</button>
            </div>
          </div>
        </CustomModal>
      </div>
    );
  }
}

export default RestaurantRequests;
