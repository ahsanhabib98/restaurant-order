import React, { Component } from "react";
import { Link } from "react-router-dom";

class ItemHeader extends Component {
  render() {
    // console.log("Prarams ID: ", this.props.id);
    const { brandingID, subdomain } = this.props.match?.params;

    return (
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Edit Item</h5>
          <Link to={`/menu/${brandingID}/${subdomain}/items-modifiers-create`}>
            <button className="btn btn-primary btn-md">New Item</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ItemHeader;
