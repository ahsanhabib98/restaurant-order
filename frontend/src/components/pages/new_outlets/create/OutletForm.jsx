import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

// import { WithContext as ReactTags } from "react-tag-input/dist-modules/components/ReactTags";
import Switch from "react-switch";
import { createOutletUpdateAction } from "../../../../store/actions/outletAction";
import Select from "react-select";

const KeyCodes = {
  comma: 188,
  tab: 9,
  space: 32,
};

const delimiters = [KeyCodes.comma, KeyCodes.tab, KeyCodes.space];

class OutletForm extends Component {
  state = {
    outlet: {
      // outlet: "",
      email: "",
      name: "",
      // avatar: "",
      // contact_info: "",
      phone: "",
      address: "",
      delivery_fee: "",
      delivery_time_min: "",
      delivery_time_max: "",
      tax_rate: "",
      is_cash_pay: false,
      is_card_pay: false,
      tax_status: "INCLUSIVE",
      delivery_area: [],
      isCashOnDlivery: true,
      isCardOnDlivery: false,
    },
    // imagePreviewUrl: "",
    // payment_method: "CARD",
    openingHour: [
      { day: "Sunday", from: "11:00", to: "11:00", is_active: true },
      { day: "Monday", from: "11:00", to: "11:00", is_active: true },
      { day: "Tuesday", from: "11:00", to: "11:00", is_active: true },
      { day: "Wednesday", from: "11:00", to: "11:00", is_active: true },
      { day: "Thursday", from: "11:00", to: "11:00", is_active: true },
      { day: "Friday", from: "11:00", to: "11:00", is_active: true },
      { day: "Saturday", from: "11:00", to: "11:00", is_active: true },
    ],
    // tag_line: "",
    // description: "",
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.locations?.length &&
      nextProps.outlet?.id &&
      !prevState.outlet.id
    ) {
      const outlet = { ...nextProps.outlet };
      outlet.delivery_area = nextProps.locations.filter((addr) =>
        outlet.delivery_area.includes(addr.value)
      );
      return {
        outlet,
      };
    }
    return null;
  }

  inputChangeHanlder = (e) => {
    console.log(e);
    if (
      (e.target.name === "delivery_time_min" ||
        e.target.name === "delivery_time_max" ||
        e.target.name === "delivery_fee") &&
      e.currentTarget.value < 0
    ) {
      return;
    }
    this.setState({
      outlet: { ...this.state.outlet, [e.target.name]: e.currentTarget.value },
    });
    if (e.target.name == "name") {
      this.props.handleOutletName(e.currentTarget.value);
    }
  };

  updateCheckboxValue = (event) => {
    this.setState({
      outlet: {
        ...this.state.outlet,
        [event.target.name]: event.target.checked,
      },
    });
  };

  openingHourIsActiveChageHandler = (e, idx) => {
    const openingHour = this.state.openingHour;
    openingHour[idx].is_active = e;
    this.setState({ openingHour });
  };

  openingHourFromChageHandler = (e, idx) => {
    const openingHour = this.state.openingHour;
    openingHour[idx].from = e.target.value;
    this.setState({ openingHour });
  };

  openingHourToChageHandler = (e, idx) => {
    const openingHour = this.state.openingHour;
    openingHour[idx].from = e.target.value;
    this.setState({ openingHour });
  };

  handleDelete = (i) => {
    const { delivery_area } = this.state;
    this.setState((state) => ({
      outlet: {
        ...state.outlet,
        delivery_area: delivery_area.filter((tag, index) => index !== i),
      },
    }));
  };

  handleAddition = (tag) => {
    this.setState((state) => ({
      outlet: {
        ...state.outlet,
        delivery_area: [...state.delivery_area, tag],
      },
    }));
  };

  handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let avatar = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        outlet: {
          ...this.state.outlet,
          avatar: avatar,
        },
      });
      this.setState({ imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(avatar);
  };

  removeImage = (e) => {
    e.preventDefault();
    this.setState({
      outlet: {
        ...this.state.outlet,
        avatar: "",
      },
      imagePreviewUrl: "",
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const payload = this.state.outlet;

    // // seperate openingHour
    // const openingHour = payload.openingHour.filter(
    //   (element) => element.is_active
    // );
    // delete payload.openingHour;

    // const contact_info = payload.contact_info;
    // if (contact_info?.length) {
    //   payload.email = contact_info[0]?.id;
    // }
    // delete payload.contact_info;

    delete payload.avatar;
    payload.delivery_area = payload.delivery_area.map((ele) => ele.value);
    payload.branding = this.props.match.params.brandingID; // TODO: assign respective brand
    payload.tag_line = "demo"; // remove it from backend
    payload.description = "demo"; // remove it from backend

    // const brandFormData = new FormData();
    // Object.keys(payload).forEach(function (key) {
    //   brandFormData.append(key, payload[key]);
    // });

    console.log("Form: ", payload);
    const { history } = this.props;
    const { subdomain, brandingID } = this.props.match.params;

    this.props.createOutletUpdateAction({
      payload,
      // contact_info,
      // openingHour,
      history,
      subdomain,
      brandingID,
    });
  };

  handleOptionChange = (delivery_area) => {
    console.log(`Option selected:`, delivery_area);
    this.setState((state) => ({ outlet: { ...state.outlet, delivery_area } }));
  };

  render() {
    const { outlet, openingHour } = this.state;
    const { locations } = this.props;

    return (
      <div className="row">
        <div className="col-md-6">
          <form action="" onSubmit={this.submitHandler}>
            <div className="contactInfo">
              <div className="form-group">
                <label htmlFor="">
                  Outlet name
                  {/* <span
                    className="text-muted ml-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Tooltip on top"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span> */}
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={outlet.name}
                  onChange={this.inputChangeHanlder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">
                  Email
                  {/* <span
                    className="text-muted ml-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Tooltip on top"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span> */}
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={outlet.email}
                  onChange={this.inputChangeHanlder}
                />

                {/* <ReactTags
                  className="form-control"
                  tags={contact_info}
                  handleDelete={this.handleDelete}
                  handleAddition={this.handleAddition}
                  delimiters={delimiters}
                  autoFocus="autofocus"
                  placeholder="Press tab, comma or space to add a new email"
                /> */}
              </div>

              <div className="form-group">
                <label htmlFor="">
                  Phone
                  {/* <span
                    className="text-muted ml-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Tooltip on top"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span> */}
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  value={outlet.phone}
                  onChange={this.inputChangeHanlder}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Delivery Fee</label>

                <input
                  type="number"
                  className="form-control"
                  name="delivery_fee"
                  value={outlet.delivery_fee}
                  onChange={this.inputChangeHanlder}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">
                  Address
                  {/* <span
                    className="text-muted ml-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Tooltip on top"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span> */}
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. building name, street"
                  name="address"
                  value={outlet.address}
                  onChange={this.inputChangeHanlder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">
                  Average delivery time (Minutes)
                  {/* <span
                    className="text-muted ml-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Tooltip on top"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span> */}
                </label>

                <div className="input-group w-100">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="From (min)"
                    name="delivery_time_min"
                    value={outlet.delivery_time_min}
                    onChange={this.inputChangeHanlder}
                  />
                  <div className="input-group-prepend">
                    <span className="input-group-text border-left-0" id="">
                      To
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="To (min)"
                    name="delivery_time_max"
                    value={outlet.delivery_time_max}
                    onChange={this.inputChangeHanlder}
                  />
                </div>
              </div>

              <div className="row tax-rate">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      Tax rate (%)
                      <span
                        className="text-muted ml-2"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Tooltip on top"
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </span>
                    </label>

                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="0.00%"
                      name="tax_rate"
                      value={outlet.tax_rate}
                      onChange={this.inputChangeHanlder}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      Tax inclusive (%)
                      <span
                        className="text-muted ml-2"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Tooltip on top"
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </span>
                    </label>

                    <div className="tax-inclusive d-flex border rounded p-1">
                      <div className="form-check form-check-inline ml-2">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="INCLUSIVE"
                            onChange={this.inputChangeHanlder}
                            name="tax_status"
                            checked={outlet.tax_status === "INCLUSIVE"}
                          />
                          Inclusive
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="tax_status"
                            value="EXCLUSIVE"
                            onChange={this.inputChangeHanlder}
                            checked={outlet.tax_status === "EXCLUSIVE"}
                          />
                          Exclusive
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="">Delivery areas</label>

                <Select
                  value={outlet.delivery_area}
                  isMulti
                  name="deliveryArea"
                  options={locations}
                  onChange={this.handleOptionChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              <div className="paymentMethod form-group border rounded p-3">
                <div className="header-box">
                  <p className="font-weight-semibold text-mute mb-0">
                    Payment methods
                  </p>
                  <small>Select all payment methods accept on delivery</small>
                </div>

                <div className="form-check mt-3 mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isCardOnDlivery"
                    id="isCardOnDlivery"
                    onChange={(e) =>
                      this.setState({
                        outlet: {
                          ...this.state.outlet,
                          is_card_pay: !this.state.outlet.is_card_pay,
                        },
                      })
                    }
                    checked={outlet.is_card_pay}
                  />
                  <label className="form-check-label" htmlFor="isCardOnDlivery">
                    Digital Payment
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isCashOnDlivery"
                    id="isCashOnDlivery"
                    onChange={(e) =>
                      this.setState({
                        outlet: {
                          ...this.state.outlet,
                          is_cash_pay: !this.state.outlet.is_cash_pay,
                        },
                      })
                    }
                    checked={outlet.is_cash_pay}
                  />
                  <label className="form-check-label" htmlFor="isCashOnDlivery">
                    Cash on Delivery
                  </label>
                </div>

                {/* <div className="form-check mt-3 mb-2">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_method"
                      value="CARD"
                      onChange={this.inputChangeHanlder}
                      checked={payment_method === "CARD"}
                    />
                    Card on delivery
                  </label>
                </div>

                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_method"
                      value="CASH"
                      onChange={this.inputChangeHanlder}
                      checked={payment_method === "CASH"}
                    />
                    Cash on Delivery
                  </label>
                </div> */}
              </div>

              <div className="opening-hour form-group mt-4">
                <div className="header-box">
                  <p className="font-weight-semibold text-mute mb-0">
                    Opening hours
                  </p>
                  <small>Set the hours your outlet is open for delivery</small>
                </div>

                <div className="table-responsive mt-3">
                  <table className="table border">
                    <thead>
                      <tr>
                        <th>Day</th>
                        <th> </th>
                        <th>From</th>
                        <th>To</th>
                        {/* <th></th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {openingHour.map((obj, idx) => {
                        return (
                          <tr key={"opening" + idx}>
                            <td>{obj.day}</td>
                            <td>
                              <Switch
                                className="react-switch"
                                id="material-switch"
                                onChange={(e) =>
                                  this.openingHourIsActiveChageHandler(e, idx)
                                }
                                checked={obj.is_active}
                                // onColor="#86d3ff"
                                // onHandleColor="#2693e6"
                                handleDiameter={30}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 3px rgba(0, 0, 0, 0.4)"
                                // activeBoxShadow="0px 3px 3px rgba(0, 0, 0, 0.1)"
                                height={18}
                                width={46}
                              />
                            </td>
                            <td>
                              {obj.is_active === true && (
                                <select
                                  name="from"
                                  className="custom-select"
                                  value={obj.from}
                                  onChange={(e) =>
                                    this.openingHourFromChageHandler(e, idx)
                                  }
                                >
                                  <option value="11:00">11:00</option>
                                  <option value="12:00">12:00</option>
                                  <option value="01:00">01:00</option>
                                  <option value="02:00">02:00</option>
                                </select>
                              )}
                            </td>
                            <td>
                              {obj.is_active === true && (
                                <select
                                  name="to"
                                  className="custom-select"
                                  value={obj.to}
                                  onChange={(e) =>
                                    this.openingHourToChageHandler(e, idx)
                                  }
                                >
                                  <option value="11:00">11:00</option>
                                  <option value="12:00">12:00</option>
                                  <option value="01:00">01:00</option>
                                  <option value="02:00">02:00</option>
                                </select>
                              )}
                            </td>
                            {/* <td>
                              {obj.is_active === true && (
                                <button className="btn btn-sm">
                                  <span className="mr-2">
                                    <FontAwesomeIcon icon={faPlus} />
                                  </span>
                                  Add hours
                                </button>
                              )}
                            </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* <div className="website-purpose mt-5">
              <h5>Website purpose</h5>

              <div className="form-group">
                <label htmlFor="">Logo</label>

                <div className="input-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => {
                        this.setState({ logo: e.target.files[0] });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="">Brand tag line</label>

                <input
                  type="text"
                  className="form-control"
                  name="tag_line"
                  value={tag_line}
                  onChange={this.inputChangeHanlder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Description</label>

                <textarea
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={this.inputChangeHanlder}
                  rows="4"
                ></textarea>
              </div>
            </div> */}

            <button type="submit" className="btn btn-primary btn-lg">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { createOutletUpdateAction })(OutletForm);
