// import FeatherIcon from "feather-icons-react";
import React, { Component } from "react";
// import PreviewWidget from "./PreviewWidget";
import Preview from "./Preview";
import ReactColor from "./ColorPicker";
import axios from "axios";
import { marketingBrandURL } from "../../../constants";
import ImageUpload from "../imageUploadPreview/ImageUpload";

const DEFAULT_MARKETING = {
  base_color: "",
  cover_photo: "",
  text_color: "",
};

class BrandingFrom extends Component {
  state = {
    marketing: null,
    imagePreviewUrl: "",
  };

  setImage = (file) => {
    if (!file) {
      this.setState({
        marketing: { ...this.state.marketing, cover_photo: "" },
        imagePreviewUrl: "",
      });
      return;
    }
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        marketing: { ...this.state.marketing, cover_photo: file },
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  handleImageChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    this.setImage(file);
  };
  submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const { marketing } = this.state;
    const { subdomain, brandingID } = this.props.match.params;
    formData.append("branding", brandingID);
    formData.append("base_color", marketing.base_color);
    formData.append("text_color", marketing.text_color);
    if (marketing.cover_photo?.name || marketing.cover_photo == "")
      formData.append("cover_photo", marketing.cover_photo);

    let method = axios.post;
    let url = marketingBrandURL;
    if (marketing.id) {
      url += `${marketing.id}/`;
      method = axios.patch;
    }
    method(`${url}?subdomain=${subdomain}`, formData)
      .then((res) => {
        // console.log(res.data);
        this.setState({ marketing: res.data });
        alert("Brand Information Saved");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  componentDidMount() {
    const { subdomain } = this.props.match.params;
    axios
      .get(`${marketingBrandURL}?subdomain=${subdomain}`)
      .then(({ data }) => {
        if (data?.length) {
          data = data[0];
          const cover_photo = data.cover_photo ? data.cover_photo : "";
          this.setState({ marketing: data, imagePreviewUrl: cover_photo });
        } else {
          this.setState({ marketing: DEFAULT_MARKETING });
        }
      })
      .catch((e) => {
        console.log(e);
      });
    this.subdomain = window.location.host.split(".")[0];
  }

  render() {
    const { marketing, imagePreviewUrl } = this.state;
    if (!marketing) return null;
    const cover_photo = marketing.cover_photo ? marketing.cover_photo : "";
    const brandingStyleColor = {
      background: marketing.base_color,
      color: marketing.text_color,
      transition: " all 0.3s",
    };

    return (
      <>
        <div className="branding-wrap">
          <div className="row">
            <div className="col-md-6">
              <form
                action=""
                className="card card-body "
                onSubmit={this.submitHandler}
              >
                <div className="form-group">
                  <label htmlFor="">Cover Photo</label>
                  {/* <input
                    type="file"
                    className="form-control mb-3"
                    onChange={this.handleImageChange}
                  /> */}

                  <ImageUpload
                    getImage=""
                    isSmall={false}
                    defaultPreviewImage={cover_photo}
                    setImage={this.setImage}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <ReactColor
                        title="Base Color"
                        color={marketing.base_color}
                        onChange={(e) => {
                          this.setState({
                            marketing: {
                              ...marketing,
                              base_color: e.target.value,
                            },
                          });
                        }}
                        name="Base Color"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <ReactColor
                        title="Text Color"
                        color={marketing.text_color}
                        onChange={(e) => {
                          this.setState({
                            marketing: {
                              ...marketing,
                              text_color: e.target.value,
                            },
                          });
                        }}
                        name="Text Color"
                      />
                    </div>
                  </div>
                </div>

                {/* <h6 className="text-muted mt-3">Ordering widget</h6>

                <div className="form-group">
                  <label htmlFor="">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => this.setState({ title: e.target.value })}
                    value={this.state.title}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="">Message</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      this.setState({ widgetMessage: e.target.value })
                    }
                    value={this.state.widgetMessage}
                  />
                </div> */}

                <button className="btn btn-lg w-100 text-uppercase btn-primary">
                  Save
                </button>
              </form>
            </div>
            <div className="col-md-6">
              <div className="preview-container mt-sm-20">
                <h5>Preview</h5>
                <Preview
                  imagePreviewUrl={imagePreviewUrl}
                  bgColor={this.state.bgColor}
                  brandingStyleColor={brandingStyleColor}
                />
              </div>

              {/* <div className="preview-container mt-4">
                <h5>Preview Widget</h5>
                <PreviewWidget
                  title={this.state.title}
                  widgetMessage={this.state.widgetMessage}
                  brandingStyleColor={brandingStyleColor}
                />
              </div> */}
            </div>
          </div>
        </div>
        {/* //////////////////////// */}
        {/* <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="customization_form">
                <form>
                  <div className="form-group">
                    <label htmlFor="cover_photo" className="mr-2">
                      Cover Photo
                    </label>
                    <div className="file-upload-wrapper">
                      <input type="file" className="form-control" multiple="" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="base_color" className="mr-2">
                          Base Color
                        </label>
                        <div className="color-field">
                          <input
                            name="base_color"
                            value="#f05a22"
                            id="base_color"
                            type="color"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="text_color" className="mr-2">
                          Text Color
                        </label>
                        <div className="color-field">
                          <input
                            name="text_color"
                            className="input_color"
                            value="#666666"
                            id="base_color"
                            type="color"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <p>
                        Warning low contrast. <a href="/">Find out more</a>
                      </p>
                    </div>
                  </div>
                  <h4 className="mt-4">Ordering widget</h4>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      placeholder="Hey there, 👋"
                      type="text"
                      name="title"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <input
                      type="text"
                      placeholder="Order online now!"
                      name="message"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="icon_image">Message</label>
                    <input
                      type="file"
                      name="icon_image"
                      className="form-control"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-discount"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div> */}
      </>
    );
  }
}

export default BrandingFrom;
