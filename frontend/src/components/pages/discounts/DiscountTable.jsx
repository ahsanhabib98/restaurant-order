import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";

class DiscountTable extends Component {
  getColumns() {
    return [
      {
        dataField: "id",
        text: "Discount ID",
        sort: true,
      },
      {
        dataField: "discount",
        text: "Discount",
        sort: true,
      },
      // {
      //   dataField: "discountType",
      //   text: "Discount Type",
      //   sort: true,
      // },
      {
        dataField: "minimum",
        text: "Minimum",
        sort: true,
      },
      {
        dataField: "maximum",
        text: "Maximum ",
        sort: true,
      },
      {
        dataField: "totalUsage",
        text: "Total Usage",
        sort: true,
      },
      {
        dataField: "actions",
        text: "",
      },
    ];
  }

  customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );

  // options() {
  //   return {
  //     firstPageText: "First",
  //     prePageText: "Back",
  //     nextPageText: "Next",
  //     lastPageText: "Last",
  //     nextPageTitle: "First page",
  //     prePageTitle: "Pre page",
  //     firstPageTitle: "Next page",
  //     lastPageTitle: "Last page",
  //     showTotal: true,
  //     paginationTotalRenderer: this.customTotal,
  //     disablePageTitle: true,
  //     // paginationSize: 4,
  //     // pageStartIndex: 1,
  //     // sizePerPage: 10,
  //     // sizePerPageList: [
  //     //   {
  //     //     text: "2",
  //     //     value: 2,
  //     //   },
  //     //   {
  //     //     text: "4",
  //     //     value: 4,
  //     //   },
  //     //   {
  //     //     text: "All",
  //     //     value: this.props.discountList.length,
  //     //   },
  //     // ],
  //   };
  // }

  options() {
    return {
      custom: true,
      totalSize: this.props.discountList.length,
    };
  }

  getRows() {
    return this.props.discountList.map((item) => {
      return {
        id: item.id,
        discount: (
          <div className="discount">
            <p className="mb-0">
              {item.amount}
              {item.type === "PERCENTAGE_VALUE" && "%"}
            </p>
          </div>
        ),
        // discountType: <p className="mb-0">{item.discountType} OFF</p>,
        minimum: item.minimum_order_value,
        maximum: item.maximum_discount,
        totalUsage: item.number_of_uses,
        actions: (
          <div className="buttons d-flex">
            <Link
              to={`/${item.id}/view-discount`}
              className="btn btn-outline-dark btn-sm"
            >
              View
            </Link>
            <button className="btn btn-outline-danger btn-sm ml-2">
              Delete
            </button>
          </div>
        ),
      };
    });
  }

  render() {
    return (
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">Discount</h5>
          <Link to="/create-discount" className="btn btn-primary">
            Create Discount
          </Link>
        </div>

        {/* <BootstrapTable
          bootstrap4
          keyField="id"
          data={this.getRows()}
          columns={this.getColumns()}
          pagination={paginationFactory(this.options())}
        /> */}

        <PaginationProvider pagination={paginationFactory(this.options())}>
          {({ paginationProps, paginationTableProps }) => (
            <div>
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={this.getRows()}
                columns={this.getColumns()}
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
    );
  }
}

export default DiscountTable;
