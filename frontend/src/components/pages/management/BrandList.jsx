import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { brandingUpdateAction } from "../../../store/actions/companyAction";
import { BASE_DOMAIN } from "../../../constants";

class BrandList extends Component {
  state = {
    brandings: [],
  };
  componentDidMount() {
    const brandings = this.props.brandings?.map((element) => {
      return {
        id: element.id,
        name: element.name,
        sub_domain: element.sub_domain,
      };
    });
    this.setState({ brandings });
  }
  handleSubdomainChange(e, id) {
    const brandings = this.state.brandings;
    const idx = brandings.findIndex((ele) => id === ele.id);
    brandings[idx].sub_domain = e.target.value;
    console.log(e.target.value, id, idx, brandings);

    this.setState({ brandings: [...brandings] });
  }
  handleUpdateSobdomain(e, id) {
    e.preventDefault();
    const branding = this.state.brandings.find((ele) => ele.id === id);
    const formData = {
      sub_domain: branding.sub_domain,
    };
    const history = this.props.history;

    this.props.brandingUpdateAction({ id, formData, history });
  }
  handleVisitNow(e, subdomain) {
    e.preventDefault();
    console.log(`//${subdomain}.${BASE_DOMAIN}/`);
    window.location.href = `//${subdomain}.${BASE_DOMAIN}/delivery/`;
  }
  render() {
    return (
      <div className="brand-list mt-5">
        {/* <div className="row">
        <div className="col-md-6"> */}

        {/* <div className="brand-header d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Brands</h5>
          <Link to="/create-brand" className="btn btn-success btn-">
            <span className="mr-2">
              <FontAwesomeIcon icon={faPlus} />
            </span>
            Create New Brand
          </Link>
        </div> */}

        <form action="">
          {this.state.brandings?.map((element, idx) => {
            return (
              <div className="brand-item" key={"branind-list" + idx}>
                <div className="form-group">
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control"
                      value={element.name}
                      placeholder="Brand name"
                      onChange={(e) => console.log("TODO:", element.id, e)}
                    />
                    <button className="btn btn-outline-primary btn-lg mx-2">
                      Edit
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-sub_domain"
                      value={element.name}
                      placeholder="Brand name"
                      onChange={(e) =>
                        this.handleSubdomainChange(e, element.id)
                      }
                    />
                    <button className="btn btn-outline-primary btn-lg mx-2">
                      Edit
                    </button>
                  </div>
                </div>

                {/* <div className="brand-subdomain">
                  <div className="d-flex">
                    <div className="domain-name">
                      <input
                        type="text"
                        className="form-control"
                        value={element.sub_domain}
                        onChange={(e) =>
                          this.handleSubdomainChange(e, element.id)
                        }
                        placeholder="Brand name"
                      />
                      <span className="text-muted">onnow.com</span>
                    </div>

                    <button className="btn btn-outline-primary btn-lg ml-2">
                      Edit
                    </button>
                    <button
                      onClick={(e) => this.handleUpdateSobdomain(e, element.id)}
                      className="btn btn-outline-secondary btn-lg ml-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={(e) =>
                        this.handleVisitNow(e, element.sub_domain)
                      }
                      className="btn btn-success btn-lg ml-2"
                    >
                      Visit now
                    </button>
                  </div>
                </div> */}
              </div>
            );
          })}
        </form>
        {/* </div>
      </div> */}
      </div>
    );
  }
}

export default connect(null, { brandingUpdateAction })(BrandList);
