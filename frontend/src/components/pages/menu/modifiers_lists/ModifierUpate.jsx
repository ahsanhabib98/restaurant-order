import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { modifierURL } from "../../../../constants";
import { modifierUpdateAction } from "../../../../store/actions/modifierAction";
import Header from "../../../bases/Header";
import Sidebar from "../../../bases/Sidebar";

class ModifierUpate extends Component {
  state = {
    name: "",
    display_name: "",
    max: "",
    min: "",
    is_multiple: false,
  };

  componentDidMount() {
    axios
      .get(`${modifierURL}${this.props.match.params.id}`)
      .then((res) => {
        // console.log(res.data);
        this.setState({
          name: res.data.name,
          display_name: res.data.display_name,
          max: res.data.max,
          min: res.data.min,
          is_multiple: res.data.is_multiple,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    let { name, display_name, max, min, is_multiple } = this.state;
    this.props.modifierUpdateAction(this.props.match.params.id, {
      name,
      display_name,
      max,
      min,
      is_multiple,
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
          <div className="main_content mt-1">
            <div className="container-fluid border_top">
              <h5 className="mt-3">Create Modifier List</h5>
              <div className="card p-3 mt-3">
                <form onSubmit={this.submitHandler}>
                  <div className="row">
                    <div className="col-md-8">
                      <label>Name</label>
                      <input
                        id="name"
                        name="name"
                        defaultValue={name}
                        onChange={this.onChangeHandler}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-8">
                      <label>Display Name</label>
                      <input
                        id="display_name"
                        name="display_name"
                        defaultValue={display_name}
                        onChange={this.onChangeHandler}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-4">
                      <label>Min Modifiers</label>
                      <input
                        id="min"
                        name="min"
                        defaultValue={min}
                        onChange={this.onChangeHandler}
                        className="form-control"
                        type="number"
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Max Modifiers</label>
                      <input
                        id="max"
                        name="max"
                        defaultValue={max}
                        onChange={this.onChangeHandler}
                        className="form-control"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-8">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue={is_multiple}
                          onChange={this.onChangeHandler}
                          name="is_multiple"
                          id="flexCheckDisabled"
                        />
                        <label className="form-check-label">
                          {" "}
                          Allow multiple selection?{" "}
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

const mapStateToProps = (state) => ({
  modifier: state.modifier,
});

export default connect(mapStateToProps, { modifierUpdateAction })(
  ModifierUpate
);
