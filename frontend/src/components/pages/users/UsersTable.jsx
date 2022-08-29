import FeatherIcon from "feather-icons-react";
import React, { Component } from "react";

class UsersTable extends Component {
  state = {
    data: [],
    error: null,
    loading: false,
  };

  render() {
    const { managers } = this.props;

    return (
      <div className="userTable mt-4">
        <div className="d-flex align-items-center">
          <h5 className="mb-0 mr-2">Accounts</h5>
          <span className="text-muted">({managers?.length})</span>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-hover  mb-0">
            <thead className="table-header">
              <tr>
                <th scope="col">Users</th>
                <th scope="col">Role</th>
                <th scope="col">Access</th>
              </tr>
            </thead>
            <tbody>
              {managers &&
                managers.map((user, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <a href="#0">{user.name}</a>
                        <p>{user.email}</p>
                      </td>
                      <td>{user.is_owner ? "Account owner" : "Active user"}</td>
                      <td>{user.is_owner ? "Account manager" : "Limited"}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UsersTable;
