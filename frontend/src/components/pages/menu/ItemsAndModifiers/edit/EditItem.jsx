import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../../../../bases/Header";
import Sidebar from "../../../../bases/Sidebar";
import ItemHeader from "./ItemHeader";
import ModifierListModal from "./ModifierListModal";
import OutletsList from "./OutletsList";
import { inventoryDetailsAction } from "../../../../../store/actions/inventoryAction";
import { connect } from "react-redux";
import axios from "axios";
import { InventoryURL } from "../../../../../constants";
import { isKeyExists } from "../../../../../utils/format";
import ImageUpload from "./../../../imageUploadPreview/ImageUpload";

class EditItem extends Component {
  state = {
    imagePreviewUrl: "",
    inventory: {},
  };
  componentDidMount() {
    const { subdomain, id } = this.props.match.params;
    this.props.inventoryDetailsAction({ id, subdomain });
  }
  static getDerivedStateFromProps(props, state) {
    if (props.inventory?.id && !isKeyExists(state.inventory)) {
      const { title, price, description, avatar } = props.inventory;
      return {
        inventory: {
          title,
          price,
          description,
          avatar,
        },
      };
    }
    return null;
  }
  changeHandler = (e) => {
    this.setState({
      inventory: {
        ...this.state.inventory,
        [e.target.name]: e.target.value,
      },
    });
  };

  // PREVIOUS IMAGE HANDLER METHOD

  // setImage = (e) => {
  //   this.setState({
  //     inventory: {
  //       ...this.state.inventory,
  //       avatar: e.target.files[0],
  //     },
  //   });
  // };

  // NEW IMAGE HANDLER METHOD
  setImage = (file) => {
    if (!file) {
      this.setState({
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
    const { brandingID, subdomain, id } = this.props.match.params;
    const payload = this.state.inventory;
    if (typeof payload.avatar) {
      delete payload.avatar;
    }
    const fomeData = new FormData();
    Object.keys(payload).forEach((key) => {
      fomeData.append(key, payload[key]);
    });
    axios
      .patch(`${InventoryURL}${id}/?subdomain=${subdomain}`, fomeData)
      .then(({ data }) => {
        this.props.history.push(
          `/menu/${brandingID}/${subdomain}/items-modifiers-details/${id}`
        );
      });
  };
  render() {
    const { subdomain, brandingID, id } = this.props.match.params;
    if (!this.props.inventory?.id) return null;
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
            <div className="container">
              <ItemHeader match={this.props.match} />
              <div className="card p-3 mt-3">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-12">
                        <label>Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="title"
                          value={this.state.inventory.title}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col">
                        <label>Type</label>
                        <br />
                        <button className="btn btn-primary btn-sm">Item</button>
                      </div>
                      <div className="col">
                        <label>Price</label>
                        <input
                          id="price"
                          className="form-control"
                          type="text"
                          name="price"
                          value={this.state.inventory.price}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <label>Description</label>
                        <textarea
                          id="description"
                          className="form-control"
                          name="description"
                          value={this.state.inventory.description}
                          onChange={this.changeHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <label className="form-label">Photo</label>

                    <ImageUpload
                      isSmall={false}
                      defaultPreviewImage={
                        !this.state.imagePreviewUrl &&
                        this.state.inventory.avatar
                      }
                      setImage={this.setImage}
                    />
                    {/* <input
                      type="file"
                      className="form-control"
                      onChange={this.setImage}
                    />
                    <p>550 x 440 pixels minimum size 5 MB maximum weight</p> */}
                    {/* <img src={this.state.inventory.avatar} alt="" /> */}
                    {/* <MyDropzone /> */}
                  </div>
                </div>
                <div className="row mt-3 ">
                  <div className="col">
                    <button
                      className="btn btn-primary btn-md mr-2"
                      onClick={this.submitItem}
                    >
                      Save
                    </button>
                    <Link
                      to={`/menu/${brandingID}/${subdomain}/items-modifiers-details/${id}`}
                    >
                      <button className="btn btn-light btn-md">Cancel</button>
                    </Link>
                  </div>
                </div>
                <hr />
                <OutletsList />
                <hr />
                <ModifierListModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inventory: state.inventory.inventory,
  };
};

export default connect(mapStateToProps, { inventoryDetailsAction })(EditItem);
