import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createModifierAction } from "../../../../store/actions/modifierAction";
import Header from "../../../bases/Header";
import Sidebar from "../../../bases/Sidebar";

class CreateModifierList extends Component {
  state = {
    name: "",
    display_name: "",
    max: "",
    min: "",
    is_multiple: false,
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    let { name, display_name, max, min, is_multiple } = this.state;
    this.props.createModifierAction({
      name,
      display_name,
      max,
      min,
      is_multiple,
    });
    this.setState({
      name: "",
      display_name: "",
      max: "",
      min: "",
    });
  };

  render() {
    let { name, display_name, max, min, is_multiple } = this.state;
    const { brandingID, subdomain } = this.props.match.params;

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
              <h5 className="mt-3">Create Modifier List</h5>
              <div className="card p-3 mt-3">
                <form onSubmit={this.submitHandler}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          id="name"
                          name="name"
                          value={name}
                          onChange={this.onChangeHandler}
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Display Name</label>
                        <input
                          id="display_name"
                          name="display_name"
                          value={display_name}
                          onChange={this.onChangeHandler}
                          className="form-control"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label>Min Modifiers</label>
                        <input
                          id="min"
                          name="min"
                          value={min}
                          onChange={this.onChangeHandler}
                          className="form-control"
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label>Max Modifiers</label>
                        <input
                          id="max"
                          name="max"
                          value={max}
                          onChange={this.onChangeHandler}
                          className="form-control"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-8">
                      <div className="form-check form-group">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={is_multiple}
                          onChange={this.onChangeHandler}
                          name="is_multiple"
                          id="flexCheckDisabled"
                        />
                        <label className="form-check-label">
                          Allow multiple selection?
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-8">
                      <button
                        type="submit"
                        className="btn btn-primary btn-md mr-2"
                      >
                        Save
                      </button>
                      <Link to={`/menu/${brandingID}/${subdomain}/modifier`}>
                        <button className="btn btn-light btn-md">Cancel</button>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createModifierAction })(CreateModifierList);
