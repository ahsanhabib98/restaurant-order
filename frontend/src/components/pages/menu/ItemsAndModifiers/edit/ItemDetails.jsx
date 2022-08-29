import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { inventoryDetailsAction } from "../../../../../store/actions/inventoryAction";

class ItemDetails extends Component {
  componentDidMount() {
    const { subdomain, id } = this.props.match.params;
    this.props.inventoryDetailsAction({ id, subdomain });
  }

  render() {
    const { inventory } = this.props;
    const { brandingID, subdomain, id } = this.props.match.params;
    return (
      <>
        <div className="row ItemDetailComponent">
          <div className="col-md-6">
            <div className="row">
              <div className="col">
                <p className="item_label">Name:</p>
                <h6>{inventory.title}</h6>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <p className="item_label">Price:</p>
                <h6>BDT {inventory.price}</h6>
              </div>
              <div className="col">
                <p className="item_label">Type:</p>
                <h6>{inventory.item_type}</h6>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <p className="item_label">Description:</p>
                <p className="text-dark">{inventory.description}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h5>Photo:</h5>
            <div className="detail_image">
              <img src={inventory.avatar} alt="logo" />
            </div>
            {/* if there is no image then */}
            {/* <input type="file" /> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 ">
            <Link
              to={`/menu/${brandingID}/${subdomain}/items-modifiers-edit/${id}`}
            >
              <button className="btn btn-primary mr-2">Edit</button>
            </Link>
            <Link to={`/menu/${brandingID}/${subdomain}/items-modifiers`}>
              <button className="btn btn-light">Back</button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inventory: state.inventory.inventory,
  };
};

export default connect(mapStateToProps, { inventoryDetailsAction })(
  ItemDetails
);
