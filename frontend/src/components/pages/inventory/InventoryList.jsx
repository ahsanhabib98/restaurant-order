import React, { Component } from "react";
import FeatherIcon from "feather-icons-react";
import { connect } from "react-redux";
import { inventoryActionList } from "../../../store/actions/inventoryAction";
import Filter from "./Filter";
import Switch from "react-switch";

class InventoryList extends Component {
  state = {
    searchValue: "",
    availability: false,
  };

  componentDidMount() {
    this.props.inventoryActionList(this.props.subdomain);
  }

  render() {
    const { inventories } = this.props;
    let searchInventory =
      inventories &&
      inventories.filter((item) => {
        return item.title
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase());
      });

    const { inventory } = this.props;
    // console.log(inventory);

    return (
      <>
        <Filter
          searchValue={this.searchValue}
          searchHandler={(e) => this.setState({ searchValue: e.target.value })}
        />

        {inventory &&
          inventory.map((item, index) => (
            <div className="card mt-3" key={index}>
              <div className="card-header d-flex justify-content-between align-items-center border-0 ">
                <button
                  className="d-flex align-items-center btn-link border-0 mb-0 pl-0"
                  data-toggle="collapse"
                  data-target={"#" + item.id}
                >
                  <FeatherIcon icon="plus-circle" size="20" className="mr-2" />
                  <span> {item.title}</span>
                </button>

                <label className="switch m-0">
                  <input
                    type="checkbox"
                    id="togBtn"
                    ref={`availability_${item.id}`}
                    // onChange={this.changeHandler}
                    // checked={this.state.availability == true}
                  />
                  <div className="slider round"></div>
                </label>

                {/* <Switch
                  className="react-switch"
                  id="material-switch"
                  name="availability"
                  // onChange={(e) => this.changeHandler(e, index)}
                  // checked={this.state.availability}
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 3px rgba(0, 0, 0, 0.4)"
                  height={18}
                  width={46}
                /> */}
              </div>
              <div className="card-body border-top  collapse" id={item.id}>
                {/* <h6 className="">{item.title}</h6> */}
                <p>{item.description}</p>
                <p className="text-muted mb-0">BDT {item.price}.00</p>
              </div>
            </div>
          ))}

        {/* {searchInventory &&
          searchInventory.map((item, index) => (
            <div key={index}>
              <h5 className="mb-0">
                <div className="row item_hover">
                  <div className="col-md-10">
                    <p
                      className="btn btn-link"
                      data-toggle="collapse"
                      data-target={"#" + item.id}
                      aria-expanded="true"
                      aria-controls="InventoryListCollapse"
                    >
                      <FeatherIcon
                        icon="plus-circle"
                        size="20"
                        className="mr-2"
                      />
                      {item.title}
                    </p>
                  </div>
                  <div className="col-md-2 mt-2 text-right"></div>
                </div>
              </h5>
              <div
                id={item.id}
                className="collapse hide ml-5 pt-3"
                aria-labelledby="headingOne"
                data-parent="#modifierListCollapse"
              >
                <div className="row">
                  <div className="col-md-10">
                    <label className="m-0">{item.title}</label>
                    <h6>
                      {item.description}{" "}
                      <small className="text-muted">BDT {item.price}.00</small>
                    </h6>
                  </div>
                  <div className="col-md-2 text-right">
                    <label className="switch">
                      <input type="checkbox" id="togBtn" />
                      <div className="slider round"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  inventory: state.inventory.inventories,
  subdomain: state.login_auth.subdomain,
});

export default connect(mapStateToProps, { inventoryActionList })(InventoryList);
