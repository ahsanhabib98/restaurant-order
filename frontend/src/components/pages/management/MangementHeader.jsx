import React, { useState } from "react";
// import { companyUpdateAction } from "../../../store/actions/companyAction";
import axios from "axios";
import { companyDetailsURL } from "../../../constants";

const MangementHeader = ({ company }) => {
  const [companyName, setCompanyName] = useState(company.name);
  const [isDisable, setDisable] = useState(true);

  const disableHandler = (e) => {
    e.preventDefault();
    setDisable(!isDisable);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    const payload = {
      name: companyName,
    };

    console.log(payload);
    console.log("Updaet Company Name");
    axios.patch(companyDetailsURL(company.id), payload).then(({ data }) => {
      console.log(data);
      window.location.reload();
    });
    // companyUpdateAction(company.id, payload);
  };

  return (
    <div className="management-header">
      <div className="row">
        <div className="col-md-6">
          <form action="">
            <div className="form-group">
              <h5>Company Name</h5>

              <div className="d-md-flex d-lg-flex">
                <input
                  type="text"
                  className="form-control mr-lg-2  mr-md-2"
                  onChange={(e) => setCompanyName(e.target.value)}
                  value={companyName}
                  disabled={isDisable}
                />
                <button
                  className="btn btn-outline-dark btn-lg mr-2 mt-sm-20"
                  onClick={disableHandler}
                >
                  Edit
                </button>

                {!isDisable && (
                  <button
                    className="btn btn-secondary btn-lg mt-sm-20"
                    onClick={updateHandler}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MangementHeader;
