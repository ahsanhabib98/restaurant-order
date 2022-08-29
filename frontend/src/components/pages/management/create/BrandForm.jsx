import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPlus,
  faFileImage,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

import { WithContext as ReactTags } from "react-tag-input/dist-modules/components/ReactTags";
import Switch from "react-switch";
import { brandingCreateAction } from "../../../../store/actions/companyAction";
import ImageUpload from "../../imageUploadPreview/ImageUpload";
import { Link } from "react-router-dom";

const KeyCodes = {
  comma: 188,
  tab: 9,
  space: 32,
};

const delimiters = [KeyCodes.comma, KeyCodes.tab, KeyCodes.space];

class BrandForm extends Component {
  state = {
    name: "",
    sub_domain: "",
    logo: "",
  };
  inputChangeHanlder = (e) => {
    this.setState({
      [e.target.name]: e.currentTarget.value,
    });

    if (e.target.name == "name") {
      this.props.handleBrandName(e.currentTarget.value);
    }
  };

  updateCheckboxValue = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  };

  openingHourIsActiveChageHandler = (e, idx) => {
    console.log(e, idx);
    const openingHour = this.state.openingHour;
    openingHour[idx].is_active = e;
    this.setState({ openingHour });
  };

  openingHourFromChageHandler = (e, idx) => {
    console.log(e, idx);
    const openingHour = this.state.openingHour;
    openingHour[idx].from = e.target.value;
    this.setState({ openingHour });
  };

  openingHourToChageHandler = (e, idx) => {
    console.log(e, idx);
    const openingHour = this.state.openingHour;
    openingHour[idx].from = e.target.value;
    this.setState({ openingHour });
  };

  handleDelete = (i) => {
    const { contact_info } = this.state;
    this.setState({
      contact_info: contact_info.filter((tag, index) => index !== i),
    });
  };

  handleAddition = (tag) => {
    this.setState((state) => ({ contact_info: [...state.contact_info, tag] }));
  };

  setImage = (logo) => {
    this.setState({ logo: logo });
  };

  removeImage = (e) => {
    e.preventDefault();
    this.setState({ logo: "", imagePreviewUrl: "" });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const payload = { ...this.state, company: this.props.company?.id };
    const brandFormData = new FormData();
    Object.keys(payload).forEach(function (key) {
      brandFormData.append(key, payload[key]);
    });

    console.log("Form: ", payload);
    const history = this.props.history;

    this.props.brandingCreateAction({
      brandFormData,
      history,
    });
  };

  render() {
    const { name, sub_domain } = this.state;

    return (
      <div className="brand-form">
        <div className="brandInfo">
          <h5>Brand information</h5>

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
                    value={name}
                    onChange={this.inputChangeHanlder}
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor=""
                    className="d-flex justify-content-between align-items-center "
                  >
                    URL
                    <Link target='_blank' to={`//${sub_domain ? sub_domain : ""}.onnow.io`}>
                      <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
                      <span className="ml-1">
                        {" "}
                        {sub_domain ? sub_domain : "<< example >>"}.onnow.io
                      </span>
                    </Link>
                  </label>

                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="sub_domain"
                      value={sub_domain}
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
                  {/* <label
                    htmlFor=""
                    className="d-flex justify-content-between align-items-center w-100"
                    onClick={this.removeImage}
                  >
                    <span>
                      Brand logo
                      <span
                        className="text-muted ml-2"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Tooltip on top"
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </span>
                    </span>

                    {imagePreviewUrl !== "" && (
                      <a
                        href=""
                        className="btn-link font-weight-semibold custom-text-primary"
                      >
                        Remove
                      </a>
                    )}
                  </label> */}

                  {/* <div className="image-upload-wrap">
                  <input
                    type="file"
                    className="form-control file-upload-input"
                    onChange={this.handleImageChange}
                  />

                  <div className="img-icon">
                    <span>
                      <FontAwesomeIcon icon={faFileImage} />
                    </span>
                  </div>

                  {imagePreviewUrl !== "" && (
                    <div className="img-container">
                      <img src={imagePreviewUrl} alt="" />
                    </div>
                  )}
                </div> */}

                  <ImageUpload
                    getImage=""
                    isSmall={true}
                    setImage={this.setImage}
                  />

                  <small className="text-muted">
                    Max of 1MB, Upload your Brand logo.
                  </small>
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn-lg ">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  company: state.company.company,
});
export default connect(mapStateToProps, { brandingCreateAction })(BrandForm);
