import React, { Component } from "react";
import Sidebar from "./../../bases/Sidebar";
import Header from "./../../bases/Header";
import { Link } from "react-router-dom";
import OutletForm from "./create/OutletForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { locationAction } from "../../../store/actions/companyAction";
import { outLetURL } from "../../../constants";
import axios from "axios";

class ManagementOutlet extends Component {
  state = {
    outletName: "",
    locations: [],
    edit: false,
  };
  static getDerivedStateFromProps(props, state) {
    if (props.locations?.length && !state.locations.length) {
      // const locations = props.locations.map((element) => {
      //   return {
      //     value: element.id,
      //     label: element.name,
      //   };
      // });
      const locations = [];
      props.locations.forEach((parentLocation) => {
        if (parentLocation.child?.length) {
          parentLocation.child.forEach((location) => {
            locations.push({
              value: location.id,
              label: location.name,
            });
          });
        }
      });
      return {
        locations,
      };
    }
    return null;
  }
  getOutlet() {
    const { id, subdomain } = this.props.match.params;
    axios
      .get(`${outLetURL}${id}/?subdomain=${subdomain}`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ outlet: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    if (
      this.props.match.path ===
      "/brand/:brandingID/:subdomain/update-outlet/:id"
    ) {
      this.setState({ edit: true });
      this.getOutlet();
    }
    this.props.locationAction();
  }
  render() {
    const { match, history } = this.props;
    const { outletName, locations, outlet } = this.state;
    const { subdomain, brandingID } = this.props.match.params;
    return (
      <div id="wrapper">
        <div className="navbar-nav">
          <Sidebar />
        </div>
        <div className="d-flex flex-column content_area">
          <Header />

          <div className="main_content">
            <div className="container-fluid">
              <span>
                <Link
                  to={`/brand-details/${brandingID}/${subdomain}`}
                  className="d-flex align-items-center my-3"
                >
                  <span>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                  </span>
                  <h4 className="text-muted mt-2 ml-3">
                    {outletName ? outletName : "Outlet"}
                  </h4>
                </Link>
              </span>

              <OutletForm

                match={match}
                history={history}
                locations={locations}
                outlet={outlet}
                handleOutletName={(outletName) => {
                  this.setState({ outletName });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    locations: state.company.locations,
  };
};
export default connect(mapStateToProps, { locationAction })(ManagementOutlet);
