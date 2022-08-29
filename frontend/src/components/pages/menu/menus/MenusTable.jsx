import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { menusURL } from "../../../../constants";
import { menuPlateformListAction } from "../../../../store/actions/menusPlateformAction";
import DeleteModal from "../DeleteModal";
import { menuListAction } from "../../../../store/actions/menuAction";
import CustomModal from "./../../modal/CustomModal";

class MenusTable extends Component {
  state = {
    isClose: false,
    isModalOpen: false,
  };

  handleClose = (e) => {
    // e.preventDefault();
    this.setState({
      isModalOpen: false,
    });
    // console.log("CLose modal: ", this.state.isModalOpen);
  };

  handleShow = (e) => {
    e.preventDefault();
    this.setState({
      isModalOpen: true,
    });
    // console.log("CLose modal: ", this.state.isModalOpen);
  };

  componentDidMount() {
    this.props.menuListAction(this.props.subdomain);
  }

  render() {
    const { menus } = this.props;
    const { brandingID, subdomain } = this.props.match.params;
    return (
      <>
        <div className="card table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-header">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Platform</th>
                <th scope="col">State</th>
                <th scope="col" className="text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {menus.length > 0 &&
                menus.map((menu, index) => {
                  return (
                    <tr key={index}>
                      <td>{menu.name && menu.name}</td>
                      <td>{menu.platform && menu.platform}</td>
                      <td>
                        {menu.is_published && menu.is_published ? "" : "Draft"}
                        <button
                          type="button"
                          className="btn btn-outline-success btn-sm ml-2"
                        >
                          Publish
                        </button>
                      </td>
                      <td className="text-right">
                        <Link
                          to={`/menu/${brandingID}/${subdomain}/menus-details/${menu.id}`}
                        >
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-sm mr-1"
                          >
                            View
                          </button>
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm mr-1"
                          onClick={this.handleShow}
                        >
                          Delete
                        </button>
                        {/* <DeleteModal name="Daily menu" /> */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <CustomModal
          title="Daily menu"
          isModalOpen={this.state.isModalOpen}
          handleClose={this.handleClose}
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
              <button type="button" className="btn btn-danger">
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
  menus: state.menus,
});

export default connect(mapStateToProps, { menuListAction })(MenusTable);
