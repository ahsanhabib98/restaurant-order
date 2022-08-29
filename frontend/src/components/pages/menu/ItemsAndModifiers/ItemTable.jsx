import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  inventoryActionList,
  inventoryDeleteAction,
} from "../../../../store/actions/inventoryAction";
import Pagination from "../../customers/Pagination";
import DeleteModal from "../DeleteModal";
import CustomModal from "./../../modal/CustomModal";

class ItemTable extends Component {
  state = {
    activeID: null,
    activeTitle: "",
    isClose: false,
    isModalOpen: false,
  };

  handleDeleteItem = (e) => {
    const { subdomain } = this.props.match.params;
    const id = this.state.activeID;
    if (id) {
      this.props.inventoryDeleteAction({ subdomain, id });
      this.setState({
        isModalOpen: false,
        activeID: null,
        activeTitle: null,
      });
    }
  };

  handleShow = (e, title, id) => {
    e.preventDefault();
    this.setState({
      isModalOpen: true,
      activeTitle: title,
      activeID: id,
    });
    // console.log("CLose modal: ", this.state.isModalOpen);
  };

  componentDidMount() {
    this.props.inventoryActionList(this.props.brand_subdomain);
  }

  render() {
    const { inventories } = this.props;
    const { brandingID, subdomain } = this.props.match.params;
    return (
      <>
        <div className="card table-responsive itemTableRow">
          <table className="table table-hover mb-0 last-col-left">
            <thead className="table-header">
              <tr>
                <th scope="col">
                  <a href="#0">Items</a>
                </th>
                <th scope="col">{/* <a href="#0">Type</a> */}</th>

                <th scope="col">
                  <a href="#0">Price</a>
                </th>
                <th scope="col">
                  <a href="#0">Created At</a>
                </th>
                <th className="" scope="col">
                  <a href="#0"> </a>
                </th>
              </tr>
            </thead>
            <tbody>
              {inventories.length > 0 &&
                inventories.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row" className="first-column ">
                        <img
                          src={item.avatar}
                          className="table-image"
                          alt="."
                        />
                        <div className="menu_items">
                          <h6>{item.title}</h6>
                          <p className="mb-0">
                            {item.description.substring(0, 50) + "..."}
                          </p>
                        </div>
                      </th>
                      <td>{item.parent ? item.parent : ""}</td>
                      <td>{item.price}</td>
                      <td>
                        <p className="mb-0 text-dark">{item.created_at}</p>
                        {/* <span>01:36:57</span> */}
                      </td>
                      <td className="">
                        <Link
                          to={`/menu/${brandingID}/${subdomain}/items-modifiers-details/${item.id}`}
                          className="btn btn-outline-dark btn-sm mr-1"
                        >
                          View
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm mr-1"
                          onClick={(e) =>
                            this.handleShow(e, item.title, item.id)
                          }
                        >
                          Delete
                        </button>
                        {/* <DeleteModal name="Chicken BBQ Pizza" /> */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {/* <div className="row pt-2 pb-2 ml-0 mr-0 tableFooter">
            <div className="col-md-6">
              <p className="mb-0 mt-2 pl-1 text-dark">
                Showing from 1 to 15 of 15 records.
              </p>
            </div>
            <div className="col-md-6 text-right">
              <Pagination />
            </div>
          </div> */}
        </div>

        <CustomModal
          title={this.state.activeTitle}
          isModalOpen={this.state.isModalOpen}
        >
          <div className="p-4">
            <h5>Are you sure?</h5>
            <p>
              <b>{this.props.name}</b> will be permanently deleted.
            </p>

            <div className="btn-container p-0">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.handleDeleteItem}
              >
                Yes, delete it!
              </button>
            </div>
          </div>
        </CustomModal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  subdomain: state.login_auth.subdomain,
  inventories: state.inventory.inventories,
});

export default connect(mapStateToProps, {
  inventoryActionList,
  inventoryDeleteAction,
})(ItemTable);
