import React, { Component } from "react";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";

class UsersHeader extends Component {
  render() {
    return (
      <div className="userHeader pt-3">
        <div className="d-flex justify-content-between">
          <div className="box">
            <h5 className=" mb-2">Users</h5>
            <p className="">
              Control your team's access to your onnow dashboard.
            </p>
            {/* <p className="user_docs mb-0 custom-text-primary ">
              <FeatherIcon icon="book-open" size="15" />
              <Link to="/">How to manage users</Link>
            </p> */}
          </div>

          <div className="box">
            {/* <Link
              to="/outlet/create"
              className="btn btn-lg btn-primary invite-user"
            >
              <span className="mr-2">
                <FeatherIcon icon="plus-circle" size="18" />
              </span>
              Invite users
            </Link> */}

            <button
              className="btn btn-primary mt-4"
              // onClick={(e) =>
              //   this.setState({ isModalOpen: !this.state.isModalOpen })
              // }
              onClick={(e) => this.props.handleModal(!this.props.isModalOpen)}
            >
              Invite Users
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersHeader;
