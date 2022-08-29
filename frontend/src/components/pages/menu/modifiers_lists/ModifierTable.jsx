import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import { modifierListAction } from "../../../../store/actions/modifierAction";
import CustomModal from "../../modal/CustomModal";

class ModifierTable extends Component {
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
    const { subdomain } = this.props.match.params;
    this.props.modifierListAction(subdomain);
  }

  // getColums() {
  //   return [
  //     {
  //       dataField: "name",
  //       text: "Name",
  //       sort: true,
  //     },
  //     {
  //       dataField: "display_name",
  //       text: "Display Name",
  //       sort: true,
  //     },
  //     {
  //       dataField: "type",
  //       text: "Type",
  //       sort: true,
  //     },
  //     {
  //       dataField: "modifiers_attached",
  //       text: "Modifiers Attached",
  //       sort: true,
  //     },
  //     {
  //       dataField: "min_selection",
  //       text: "Min Selection",
  //       sort: true,
  //     },
  //     {
  //       dataField: "max_selection",
  //       text: "Max Selection",
  //       sort: true,
  //     },
  //     {
  //       dataField: "created_at",
  //       text: "Created At",
  //       sort: true,
  //     },
  //     {
  //       dataField: "actions",
  //       text: "Actions",
  //     },
  //   ];
  // }

  // getRows() {
  //   const data = this.state.modifier.map((request) => {
  //     return {
  //       name: request.name,
  //       display_name: request.display_name,
  //       type: request.modifier_type,
  //       modifiers_attached: request.id,
  //       min_selection: request.min,
  //       max_selection: request.max,
  //       created_at: request.created_at,
  //       actions: (
  //         <>
  //           <Link
  //             to={`/modifier-details/${request.id}`}
  //             className="btn btn-outline-dark btn-sm mr-1"
  //           >
  //             View
  //           </Link>
  //           <DeleteModal name="Extra toppings" />
  //         </>
  //       ),
  //     };
  //   });

  //   return data;
  // }

  render() {
    let { modifiers } = this.props;
    const { brandingID, subdomain } = this.props.match.params;

    return (
      <>
        {/* <BootstrapTable
          bootstrap4
          keyField="modifiers_attached"
          data={this.getRows()}
          columns={this.getColums()}
        /> */}

        <div className="card table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-header">
              <tr>
                <th scope="col">
                  <a href="#0">Name</a>
                </th>
                <th scope="col">
                  <a href="#0">Display Name</a>
                </th>

                <th scope="col">
                  <a href="#0">Type</a>
                </th>
                <th scope="col">
                  <a href="#0">Modifiers Attached</a>
                </th>
                <th scope="col">
                  <a href="#0">Min Selection</a>
                </th>

                <th scope="col">
                  <a href="#0">Max Selection</a>
                </th>
                <th scope="col">
                  <a href="#0">Created At</a>
                </th>
                <th scope="col">
                  <a href="#0">Actions</a>
                </th>
              </tr>
            </thead>
            <tbody className="text-cente">
              {modifiers.length > 0 &&
                modifiers.map((modifier, index) => {
                  return (
                    <tr key={index}>
                      <td>{modifier.name}</td>
                      <td>{modifier.display_name}</td>
                      <td>{modifier.modifier_type}</td>
                      <td>{modifier.id}</td>
                      <td>{modifier.min}</td>
                      <td>{modifier.max}</td>
                      <td>
                        <small className="font-weight-bold">
                          {modifier.created_at}
                        </small>
                      </td>
                      <td>
                        <Link
                          to={`/menu/${brandingID}/${subdomain}/modifier-details/${modifier.id}`}
                          className="btn btn-outline-dark btn-sm mr-1"
                        >
                          View
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm mr-1"
                          onClick={this.handleShow}
                        >
                          Delete
                        </button>
                        {/* <DeleteModal name="Extra toppings" /> */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <CustomModal
          title="Extra toppings"
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

const mapStateToProps = (state) => {
  return {
    modifiers: state.modifier.modifiers,
  };
};

export default connect(mapStateToProps, { modifierListAction })(ModifierTable);
