import React, { Component } from "react";
import Header from "../../bases/Header";
import Sidebar from "../../bases/Sidebar";

import UsersHeader from "./UsersHeader";
import UsersTable from "./UsersTable";
import { connect } from "react-redux";
// import ReactTable from "./ReactTable";
import CustomModal from "./../modal/CustomModal";
import { companyBrandingManagerListURL, invitation } from "../../../constants";

import axios from "axios";

class Users extends Component {
  state = {
    brand: "",
    email: "",
    isModalOpen: false,
    managers: [],
  };

  setIsModalOpen = (isModalOpen) => {
    // console.log("Modal: ", isModalOpen);
    this.setState({ isModalOpen });
  };

  onchangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const { email, brand } = this.state;

    if (!email || !brand) {
      alert("Please fill up both field");
    }
    axios
      .post(`${invitation}/`, { email, branding: brand })
      .then(({ data }) => {
        alert("User Invitation send via mail.");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleFetchManagers = (company) => {
    this.setState({ loading: true });
    axios
      .get(companyBrandingManagerListURL(company.id))
      .then((res) => {
        this.setState({ managers: res.data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.company && !this.state.managers?.length) {
      this.handleFetchManagers(nextProps.company);
    }
  }

  componentDidMount() {
    if (this.props.company) {
      this.handleFetchManagers(this.props.company);
    }
  }

  render() {
    const { brandings } = this.props;
    const { managers } = this.state;

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
            <div className="container-fluid">
              <UsersHeader
                isModalOpen={this.state.isModalOpen}
                handleModal={this.setIsModalOpen}
                managers={managers}
              />

              {this.state.managers?.length ? (
                <UsersTable
                  subdomain={this.props.subdomain}
                  company={this.props.company}
                  managers={managers}
                />
              ) : null}

              {/* Custom Modal */}
              <CustomModal
                title="Invite User"
                isModalOpen={this.state.isModalOpen}
                handleClose={(e) => this.setState({ isModalOpen: false })}
              >
                <form action="" className="p-3" onSubmit={this.submitHandler}>
                  <div className="form-group">
                    <label htmlFor="">Brands</label>
                    <select
                      name="brand"
                      className="custom-select"
                      onChange={this.onchangeHandler}
                    >
                      <option value={null}>Select</option>

                      {brandings &&
                        brandings.map(({ id, name }) => (
                          <option
                            value={id}
                            key={id}
                            className="text-capitalize"
                          >
                            {name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onchangeHandler}
                    />
                  </div>

                  <button className="btn btn-primary btn-lg w-100">
                    Submit
                  </button>
                </form>
              </CustomModal>

              {/* <h6 className="p-3 border mt-5 rounded font-weight-bold text-uppercase table-secondary">
                Demo Table
              </h6>
              <ReactTable /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    company: state.company.company,
    subdomain: state.login_auth.user.sub_domain,
    brandings: state.company.brandings,
  };
};

export default connect(mapStateToProps)(Users);
