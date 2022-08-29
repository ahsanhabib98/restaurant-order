import React, { Component } from "react";
import Sidebar from "./../../../bases/Sidebar";
import { Link } from "react-router-dom";
import Header from "./../../../bases/Header";
import BrandList from "./../BrandList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, connect } from "react-redux";
import OutletList from "./OutletList";
import BrandHeader from "./BrandHeader";
import { brandingDetailsAction } from "../../../../store/actions/companyAction";
import { outletListActon } from "../../../../store/actions/outletAction";

class BrandDetails extends Component {
  // const branding = useSelector((state) => state.company.branding);
  // console.log("Branding: ", branding);

  componentDidMount() {
    this.props.brandingDetailsAction(this.props.match.params.brandingID);
    this.props.outletListActon(this.props.match.params.subdomain);
  }

  render() {
    const { branding, outlets, match, history } = this.props;

    if (!branding) return null;

    return (
      <div id="wrapper">
        <div className="navbar-nav">
          <Sidebar />
        </div>
        <div className="d-flex flex-column content_area">
          <Header />

          <div className="main_content">
            <div className="container-fluid">

              <BrandHeader branding={branding} match={match} history={history} />
              <OutletList outlets={outlets} match={match} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  company: state.company.company,
  branding: state.company.branding,
  outlets: state.outlet.outlets,
});
export default connect(mapStateToProps, {
  brandingDetailsAction,
  outletListActon,
})(BrandDetails);
