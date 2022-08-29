import React, { Component } from "react";
import Sidebar from "./../../bases/Sidebar";
import BootstrapTable from "react-bootstrap-table-next";
import Header from "./../../bases/Header";
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";

function Restaurants() {
  const columns = [
    {
      dataField: "id",
      text: "SL No.",
      sort: true,
    },
    {
      dataField: "restaurants_name",
      text: "Restaurants Name",
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
      dataField: "owner",
      text: "Owner",
      sort: true,
    },
  ];

  const data = [
    {
      id: 1,
      restaurants_name: "La espresso",
      email: "espresso@gmail.com",
      phone_number: "123 456 789",
      owner: "Mr. X",
    },
    {
      id: 2,
      restaurants_name: "Burfe",
      email: "burfe@gmail.com",
      phone_number: "123 456 789",
      owner: "Mr. X",
    },
    {
      id: 3,
      restaurants_name: "Haleem Guys",
      email: "haleem@gmail.com",
      phone_number: "123 456 789",
      owner: `"Mr. X"`,
    },
    {
      id: 4,
      restaurants_name: "Burfe",
      email: "burfe@gmail.com",
      phone_number: "123 456 789",
      owner: "Mr. X",
    },
    {
      id: 5,
      restaurants_name: "Haleem Guys",
      email: "haleem@gmail.com",
      phone_number: "123 456 789",
      owner: `"Mr. X"`,
    },
    {
      id: 6,
      restaurants_name: "Burfe",
      email: "burfe@gmail.com",
      phone_number: "123 456 789",
      owner: "Mr. X",
    },
    {
      id: 7,
      restaurants_name: "Haleem Guys",
      email: "haleem@gmail.com",
      phone_number: "123 456 789",
      owner: `"Mr. X"`,
    },
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  const options = () => {
    return {
      custom: true,
      totalSize: data.length,
    };
  };

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
                Restaurants
              </h3>
            </div>
          </div> */}
          <div className="main-content">
            <div className="container-fluid">
              <h4 className="text-muted font-weight-bol mb-0 mt-4">
                Restaurants
              </h4>

              <div className="customers-info mt-4">
                {/* <h5 className="text-dark text-capitalize font-weight-bold mb-3">
                  New customers X returning customers
                </h5> */}

                <PaginationProvider pagination={paginationFactory(options())}>
                  {({ paginationProps, paginationTableProps }) => (
                    <div>
                      <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={data}
                        columns={columns}
                        {...paginationTableProps}
                      />
                      <div className="d-flex justify-content-between align-items-center">
                        <PaginationTotalStandalone {...paginationProps} />
                        <PaginationListStandalone {...paginationProps} />
                      </div>
                    </div>
                  )}
                </PaginationProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
