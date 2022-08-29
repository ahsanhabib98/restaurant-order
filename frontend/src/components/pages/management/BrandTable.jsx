import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faImage } from "@fortawesome/free-solid-svg-icons";
import Pagination from "./../customers/Pagination";

const BrandTable = ({ handleBrandDelete }) => {
  const brandings = useSelector((state) => state.company.brandings);
  // console.log("Branding: ", brandings);

  return (
    <>
      <div className="table-responsive border rounded">
        <table className="table table-hover mb-0 last-col-left">
          <thead className="table-header">
            <tr>
              <th scope="col">
                <a href="#0">Name</a>
              </th>
              {/* <th scope="col">
                <a href="#0">Total Outlets</a>
              </th> */}
              <th scope="col">
                <a href="#0">URL</a>
              </th>
              <th scope="col">
                <a href="#0"></a>
              </th>
            </tr>
          </thead>

          <tbody>
            {brandings &&
              brandings.map((brand, idx) => (
                <tr key={brand.id}>
                  <th scope="row" className="first-column ">
                    {brand.logo ? (
                      <img src={brand.logo} className="table-image" alt="." />
                    ) : (
                      <div className="table-image no-image d-flex justify-content-center align-items-center text-muted">
                        <FontAwesomeIcon icon={faImage} size="lg" />
                      </div>
                    )}
                    <h6 className="text-capitalize mb-0"> {brand.name} </h6>
                  </th>

                  {/* <td>05</td> */}

                  <td>
                    <Link target="_blank" to={`//${brand.sub_domain}.onnow.io`}>
                      <span className="mr-2">
                        <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
                      </span>
                      {brand.sub_domain + ".onnow.io"}
                    </Link>
                  </td>

                  <td>
                    <Link
                      to={`/brand-details/${brand.id}/${brand.sub_domain}`}
                      className="btn btn-outline-dark btn-sm mr-1"
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm mr-1"
                      onClick={(e) => {
                        handleBrandDelete(brand.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            {/* <tr>
            <th scope="row" className="first-column ">
              <img
                src="https://bit.ly/3g8kYtv"
                className="table-image"
                alt="."
              />
              <h6 className="mb-0"> Friggy's </h6>
            </th>

            <td>05</td>

            <td>
              <Link to="/">friggys@onnow.io</Link>
            </td>

            <td>
              <Link
                to={`/brand-details`}
                className="btn btn-outline-dark btn-sm mr-1"
              >
                View
              </Link>
              <button className="btn btn-outline-danger btn-sm mr-1">
                Delete
              </button>
            </td>
          </tr> */}
          </tbody>
        </table>
      </div>
      {/* <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0 mt-2 text-dark">
          Showing from 1 to 15 of 15 records.
        </p>
        <Pagination />
      </div> */}
    </>
  );
};

export default BrandTable;
