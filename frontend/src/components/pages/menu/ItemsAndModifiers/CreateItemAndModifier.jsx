import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../../../bases/Header";
import Sidebar from "../../../bases/Sidebar";
// import MyDropzone from "../../drop_zone"
import axios from "axios";
import { InventoryURL } from "../../../../constants";
import ImageUpload from "../../imageUploadPreview/ImageUpload";

class CreateItemAndModifier extends Component {
  state = {
    isModifierShow: false,
    modifierPhoto: "",
    imagePreviewUrl: "",
    // imagePreviewUrl:
    //   "https://res.cloudinary.com/mbrsagor/image/upload/v1619261415/image_upload_vrxpld.png",
    inventory: {
      title: "",
      description: "",
      price: 0,
      avatar: "",
      item_type: "ITEM",
    },
  };

  changeHandler = (e) => {
    this.setState({
      inventory: {
        ...this.state.inventory,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidMount() {
    document.title = "Create - items & Modifires | onnow";
  }

  showItem = () => {
    this.setState({
      isModifierShow: false,
      inventory: { ...this.state.inventory, item_type: "ITEM" },
    });
  };

  showModifier = () => {
    this.setState({
      isModifierShow: true,
      inventory: { ...this.state.inventory, item_type: "MODIFIER" },
    });
  };

  setImage = (file) => {
    // let reader = new FileReader();
    // let file = e.target.files[0];
    // reader.onloadend = () => {
    //   this.setState({
    //     inventory: {
    //       ...this.state.inventory,
    //       avatar: e.target.files[0],
    //     },
    //   });
    //   this.setState({ imagePreviewUrl: reader.result });
    // };
    // reader.readAsDataURL(file);

    //////////////////////
    if (!file) {
      this.setState({
        // marketing: { ...this.state.marketing, cover_photo: "" },
        inventory: {
          ...this.state.inventory,
          avatar: "",
        },
        imagePreviewUrl: "",
      });
      return;
    }

    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        inventory: {
          ...this.state.inventory,
          avatar: file,
        },
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  submitItem = (e) => {
    e.preventDefault();
    const { brandingID, subdomain } = this.props.match.params;
    const payload = this.state.inventory;
    payload.branding = brandingID;
    const fomeData = new FormData();
    Object.keys(payload).forEach((key) => {
      fomeData.append(key, payload[key]);
    });
    axios
      .post(`${InventoryURL}?subdomain=${subdomain}`, fomeData)
      .then(({ data }) => {
        this.props.history.push(
          `/menu/${brandingID}/${subdomain}/items-modifiers-details/${data.id}`
        );
      });
  };

  render() {
    const { brandingID, subdomain } = this.props.match.params;
    return (
      <div id="wrapper">
        <div className="navbar-nav">
          <Sidebar />
        </div>
        <div className="d-flex flex-column content_area">
          <header>
            <Header />
          </header>
          <div className="main_content">
            <div className="container-fluid">
              <h5 className="my-3">
                {this.state.isModifierShow !== true
                  ? "Create Item"
                  : "Create Modifier"}
              </h5>
              <div className="card p-3">
                <div className="row mt-2">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-12">
                        <label>Name</label>
                        <input
                          id="title"
                          className="form-control"
                          type="text"
                          name="title"
                          value={this.state.inventory.title}
                          onChange={this.changeHandler}
                        />
                      </div>
                      {/* <div className="col-md-12 mt-3">
                        <label>
                          SKU (Stock Keeping Unit) <span>optional</span>
                        </label>
                        <input id="name" className="form-control" type="text" onChange={this.changeHandler}/>
                      </div> */}
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-4 menuCreateMOdifire">
                        <label>Type</label>
                        <div className="btn-container p-0">
                          <button
                            className={`btn btn-sm mr-1 ${
                              this.state.isModifierShow === false &&
                              "btn-primary "
                            }`}
                            onClick={this.showItem}
                          >
                            Item
                          </button>
                          <button
                            className={`btn btn-sm ${
                              this.state.isModifierShow === true &&
                              "btn-primary "
                            }`}
                            onClick={this.showModifier}
                          >
                            Modifier
                          </button>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <label>Price</label>
                        <input
                          id="price"
                          placeholder="BDT"
                          className="form-control"
                          type="number"
                          name="price"
                          value={this.state.inventory.price}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>

                    {this.state.isModifierShow !== true && (
                      <div className="row mt-3 description-view">
                        <div className="col-md-12">
                          <label>Description</label>
                          <textarea
                            id="description"
                            className="form-control"
                            rows="3"
                            name="description"
                            value={this.state.inventory.description}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </div>
                    )}

                    <div className="row mt-3 ">
                      <div className="col">
                        <button
                          className="btn btn-primary btn-md mr-2"
                          onClick={this.submitItem}
                        >
                          Save
                        </button>

                        <Link
                          to={`/menu/${brandingID}/${subdomain}/items-modifiers`}
                        >
                          <button className="btn btn-light btn-md">
                            Cancel
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {this.state.isModifierShow !== true && (
                    <div className="col-md-6 mt-3">
                      <h6>Brand Photo</h6>
                      <ImageUpload
                        isSmall={false}
                        defaultPreviewImage={this.state.imagePreviewUrl}
                        setImage={this.setImage}
                      />
                      {/* <div className="image-upload mt-3">
                        <label htmlFor="file-input">
                          <img src={this.state.imagePreviewUrl} />
                        </label>
                        <input
                          id="file-input"
                          type="file"
                          onChange={this.setImage}
                        />
                      </div> */}
                      {/* <p className="file_upload_instruction">
                        <span>
                          550 x 440 pixels minimum size 5 MB maximum weight
                        </span>
                      </p> */}

                      {/* <MyDropzone /> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateItemAndModifier;
