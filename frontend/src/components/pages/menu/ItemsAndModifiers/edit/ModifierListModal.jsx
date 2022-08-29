import React, { Component } from "react";
import CustomModal from "../../../modal/CustomModal";

class ModifierListModal extends Component {
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

  render() {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Modifier List (1)</h6>

          <a
            href=""
            className="btn btn-link custom-text-primary mb-0"
            onClick={this.handleShow}
          >
            <small className="font-weight-bold">Add Modifier List</small>
          </a>
        </div>

        <CustomModal
          title={
            <>
              <span>Add modifier lists to </span>
              <span className="custom-text-primary">
                Chicken BBQ Pizza [SAMPLE]
              </span>
            </>
          }
          isModalOpen={this.state.isModalOpen}
          handleClose={this.handleClose}
        >
          <form className="items-and-modifiers-modal p-3">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>

            <div className="order-content-list">
              <div className="box mb-4">
                <div className="form-check">
                  <label
                    className="form-check-label w-100"
                    htmlFor="defaultCheck1"
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <div className="d-flex justify-content-between">
                      <div className="inner-box">
                        <h6 className="mb-0">Default checkbox</h6>
                        <small>No modifiers associated</small>
                      </div>
                      <div className="inner-box text-right">
                        <h6 className="mb-0">Single</h6>
                        <small className="text-uppercase">
                          <span>
                            Min : <strong> 4</strong>
                          </span>
                          <span className="ml-2">
                            Max : <strong> 10</strong>
                          </span>
                        </small>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <div className="box mb-4">
                <div className="form-check">
                  <label
                    className="form-check-label w-100"
                    htmlFor="defaultCheck2"
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck2"
                    />
                    <div className="d-flex justify-content-between">
                      <div className="inner-box">
                        <h6 className="mb-0">Default checkbox</h6>
                        <small>No modifiers associated</small>
                      </div>
                      <div className="inner-box text-right">
                        <h6 className="mb-0">Single</h6>
                        <small className="text-uppercase">
                          <span>
                            Min : <strong> 4</strong>
                          </span>
                          <span className="ml-2">
                            Max : <strong> 10</strong>
                          </span>
                        </small>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <div className="box mb-4">
                <div className="form-check">
                  <label
                    className="form-check-label w-100"
                    htmlFor="defaultCheck3"
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck3"
                    />
                    <div className="d-flex justify-content-between">
                      <div className="inner-box">
                        <h6 className="mb-0">Default checkbox</h6>
                        <small>No modifiers associated</small>
                      </div>
                      <div className="inner-box text-right">
                        <h6 className="mb-0">Single</h6>
                        <small className="text-uppercase">
                          <span>
                            Min : <strong> 4</strong>
                          </span>
                          <span className="ml-2">
                            Max : <strong> 10</strong>
                          </span>
                        </small>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="btn-container px-0">
              <button className="btn" onClick={this.handleClose}>
                <small>Cancel</small>
              </button>
              <button className="btn btn-primary">
                <small>
                  Add <span>0</span> lists
                </small>
              </button>
            </div>
          </form>
        </CustomModal>

        {/* <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content text-center">
              <div className="modal-head">
                <p className="modal-title mt-3 " id="exampleModalLongTitle">
                  Add modifier lists to
                  <b className="text-primary mr-2 ml-2">
                    Chicken BBQ Pizza [SAMPLE]
                  </b>
                </p>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mt-3 mb-3"
                  placeholder="Search"
                />
                <div className="row ">
                  <div className="col-md-8 text-left">
                    <p>Extra toppings</p>
                  </div>

                  <div className="col-md-4 text-right">
                    <p>Single</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 text-left">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Default checkbox
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4 text-right">
                    <p>Maximum: 5</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary btn-sm">
                  Add 0 items
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </>
    );
  }
}

export default ModifierListModal;
