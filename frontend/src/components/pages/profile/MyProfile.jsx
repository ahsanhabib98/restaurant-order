import axios from "axios";
import FeatherIcon from "feather-icons-react";
import React, { Component } from "react";
import { accountDetailURL, accountUpdateURL } from "../../../constants";
import ChangePassword from "./ChangePassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";

class MyProfile extends Component {
  state = {
    data: {
      first_name: "",
      last_name: "",
      email: "",
    },
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile = () => {
    const { user_id } = this.props;
    this.setState({ loading: true });
    axios
      .get(accountDetailURL(user_id))
      .then((res) => {
        this.setState({ data: res.data, loading: false });
        // console.log(res.data);
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  };

  userChange = (e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  };

  changeUserSubmitHandler = (e) => {
    e.preventDefault();
    const { first_name, last_name } = this.state.data;
    const { user_id } = this.props;
    this.setState({ loading: true });
    axios
      .put(accountUpdateURL(user_id), { first_name, last_name })
      .then((res) => {
        window.location.reload();
        // console.log(res.data);
        // this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="my-profile mt-4">
        <div className="profile-header">
          <h3 className="font-weight-bold">My Profile</h3>
          <p className="text-muted mb-0">
            Manage your personal information and security of your onnow account
          </p>
        </div>
        <div className="row mt-5">
          <div className="col-md-4">
            <h4>Personal information</h4>
            <form onSubmit={this.changeUserSubmitHandler}>
              <div className="form-group">
                <label htmlFor="first_name">First Name *</label>
                <input
                  type="text"
                  id="first_name"
                  className="form-control"
                  name="first_name"
                  defaultValue={data.first_name}
                  onChange={this.userChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name *</label>
                <input
                  type="text"
                  id="last_name"
                  className="form-control"
                  name="last_name"
                  defaultValue={data.last_name}
                  onChange={this.userChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-md   btn-secondary">
                Update personal info
              </button>
            </form>
            <div className="mt-5">
              <h4>Email</h4>
              <p className="mb-0">Your current email address is</p>
              <p className="font-weight-bold">{data.email}</p>
            </div>

            <ChangePassword user_id={this.props.user_id} />

            {/* <div className="mt-5">
              <h4>Live orders alert</h4>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div> */}
          </div>
        </div>

        {/* <div className="mt-5">
          <h4>Role</h4>

          <div className="row">
            <div className="col-md-6">
              <div className="card p-3 mt-3">
                <h5>Account owner</h5>

                <div className="d-flex mt-3">
                  <span className="custom-text-primary">
                    <FontAwesomeIcon icon={faStore} />
                  </span>

                  <div className="store-info ml-3">
                    <h6>Tihamis Kitchen</h6>
                    <p>Dhanmondi, Dhaka-1209, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default MyProfile;
