import React, { Component } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import Switch from "react-switch";
import ImageUpload from "./../../imageUploadPreview/ImageUpload";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { brandingUpdateAction } from "../../../../store/actions/companyAction";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

class BrandHeader extends Component {
  // const [isDisable, setDisable] = useState(true);
  // const [brandName, setBrandName] = useState(branding.name);
  // const[subDomainName, setSubDomain] = useState(branding.sub_domain);

  state = {
    isDisable: true,
    branding: null,
  };
  setImage = (logo) => {
    this.setState({ branding: { ...this.state.branding, logo } });
  };
  inputChangeHanlder = (e) => {
    this.setState({
      branding: {
        ...this.state.branding,
        [e.target.name]: e.currentTarget.value,
      },
    });
  };
  disableHandler = (e) => {
    e.preventDefault();
    this.setState({ isDisable: !this.state.isDisable });
  };
  static getDerivedStateFromProps(props, state) {
    if (props.branding?.id !== state.branding?.id) {
      return {
        branding: props.branding,
      };
    }
    return null;
  }

  submitHandler = (e) => {
    e.preventDefault();
    if (this.state.isDisable) return;
    const { brandingID, subdomain } = this.props.match.params;
    const id = brandingID;
    const payload = { ...this.state.branding };

    delete payload.id;
    if (!(payload.logo instanceof File) && payload.logo !== "")
      delete payload.logo;
    if (subdomain === this.props.branding?.sub_domain)
      delete payload.sub_domain;
    delete payload.managers;
    const brandFormData = new FormData();
    Object.keys(payload).forEach(function (key) {
      brandFormData.append(key, payload[key]);
    });

    const history = this.props.history;

    this.props.brandingUpdateAction({
      id,
      formData: brandFormData,
      history,
    });
  };

  render() {
    const { branding, isDisable } = this.state;
    if (!branding) return null;
    return (
      <div>
        <span>
          <Link to="/management" className="d-flex align-items-center my-3 ">
            <span>
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </span>
            <h4 className="text-muted text-capitalize mt-2 ml-3">
              {branding.name}
            </h4>
          </Link>
        </span>
        <div className="mb-4">
          <form
            action=""
            onSubmit={this.submitHandler}
            className="rounded border p-4 mt-3"
          >
            <div className="row">
              <div className="col-md-5">
                <div className="form-group brand-item">
                  <label htmlFor="">Brand name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={branding.name}
                    disabled={isDisable}
                    onChange={this.inputChangeHanlder}
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor=""
                    className="d-flex justify-content-between align-items-center "
                  >
                    URL
                    <Link
                      target="_blank"
                      to={`//${branding.sub_domain}.onnow.io`}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
                      <span className="ml-1">
                        {branding.sub_domain}.onnow.io
                      </span>
                    </Link>
                  </label>

                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="sub_domain"
                      value={branding.sub_domain}
                      disabled={isDisable}
                      onChange={this.inputChangeHanlder}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text" id="basic-addon2">
                        <small>.onnow.io</small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group cover-img">
                  <label htmlFor="">Brand logo</label>
                  <ImageUpload
                    getImage=""
                    isSmall={true}
                    editable={!isDisable}
                    defaultPreviewImage={branding.logo}
                    setImage={this.setImage}
                  />

                  <small className="text-muted">
                    Max of 1MB, Upload your Brand logo.
                  </small>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <button
                className="btn btn-outline-dark btn-lg mr-2"
                onClick={this.disableHandler}
              >
                Edit
              </button>
              <button
                className="btn btn-primary btn-lg"
                disabled={isDisable}
                onClick={this.submitHandler}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
// const mapStateToProps = (state) => ({
//   company: state.company.company,
//   branding: state.company.branding,
// });
export default connect(null, { brandingUpdateAction })(BrandHeader);
