import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { menusDetailsAction } from "../../../../../store/actions/menusPlateformAction";

class MenuDetails extends Component {
  componentDidMount() {
    this.props.menusDetailsAction(this.props.id);
  }

  render() {
    const { menuPlatefrom } = this.props;
    // console.log(menuPlatefrom.name);
    return menuPlatefrom.menuPlatefrom ? (
      <div>
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <p className="text-muted mb-0">Name:</p>
              <h6 className="text-capitalize mt-2">
                {menuPlatefrom.menuPlatefrom.name}

                <small className="bg-success text-white text-capitalize font-weight-bold rounded py-1 px-2 ml-2">
                  Live
                </small>
              </h6>
            </div>
          </div>

          <div className="col-md-3">
            <p className="text-muted mb-0">Platform:</p>
            <h6 className="text-capitalize mt-2">
              {menuPlatefrom.menuPlatefrom.platform}
            </h6>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4">
            <Link
              to={`/edit-menu/${menuPlatefrom.menuPlatefrom.id}`}
              className="btn btn-primary btn-sm px-3 mr-2"
            >
              Edit
            </Link>
            <Link to="/menus" className="btn btn-light btn-sm px-3 mr-2">
              Back
            </Link>
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  menuPlatefrom: state.menuPlatefrom,
});

export default connect(mapStateToProps, { menusDetailsAction })(MenuDetails);
