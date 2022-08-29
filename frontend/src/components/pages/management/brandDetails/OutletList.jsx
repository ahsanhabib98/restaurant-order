import React from "react";
import { Link } from "react-router-dom";
import Pagination from "./../../customers/Pagination";
import { useDispatch } from "react-redux";
import { deleteOutletAction } from "../../../../store/actions/outletAction";

const OutletList = ({ outlets, match }) => {
  const dispatch = useDispatch();

  const handleDeleteOutlet = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteOutletAction({ id, subdomain: match.params.subdomain }));
    }
  };
  // if (!outlets?.length) return null;

  const { brandingID, subdomain } = match.params;
  return (
    <div className="outlets-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-mute mb-0">Outlet</h5>
        <Link
          to={`/brand/${brandingID}/${subdomain}/create-outlet`}
          className="btn btn-primary"
        >
          Create
        </Link>
      </div>

      <div className="table-responsive border rounded">
        <table className="table table-hover mb-0 last-col-left">
          <thead className="table-header">
            <tr>
              <th scope="col">
                <a href="#0">SL No.</a>
              </th>
              <th scope="col">
                <a href="#0">Outlet name</a>
              </th>
              <th scope="col">
                <a href="#0">Email</a>
              </th>
              <th scope="col">
                <a href="#0">Address</a>
              </th>
              <th scope="col">
                <a href="#0">Action</a>
              </th>
            </tr>
          </thead>

          <tbody>
            {outlets.map((outlet, idx) => {
              return (
                <tr key={"outlet" + idx}>
                  <td>#{idx + 1}</td>
                  <td>{outlet.name}</td>
                  <td>{outlet.email}</td>
                  <td>{outlet.address}</td>
                  <td>
                    <Link
                      to={`/brand/${brandingID}/${subdomain}/update-outlet/${outlet.id}`}
                      className="btn btn-outline-dark btn-sm mr-1"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm mr-1"
                      onClick={(e) => {
                        handleDeleteOutlet(outlet.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0 mt-2 text-dark">
          Showing from 1 to 15 of 15 records.
        </p>
        <Pagination />
      </div> */}
    </div>
  );
};

export default OutletList;
