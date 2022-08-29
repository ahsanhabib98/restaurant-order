import React, { Component } from "react";
import FeatherIcon from "feather-icons-react";
import { connect } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import { logout } from "../../store/actions/auth";
// import { brandingListAction } from "../../store/actions/companyAction";

class NavBar extends Component {
  // componentDidMount() {
  //   this.props.brandingListAction();
  // }

  render() {
    const { user, showMenu, brandings } = this.props;
    const is_superuser = user.is_superuser;
    const is_owner = user.is_owner;
    // console.log(this.props.user);
    // console.log(is_superuser);

    return (
      <>
        {is_superuser
          ? showMenu && (
              <nav className="main_nav">
                <ul>
                  <li className="level-one">
                    <NavLink to="/superuser-dashboard">
                      <span className="mr-3">
                        <FeatherIcon icon="layout" size="15" />
                      </span>
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="level-one">
                    <NavLink to="/superuser-restaurants">
                      <span className="mr-3">
                        <FeatherIcon icon="server" size="15" />
                      </span>
                      Restaurants
                    </NavLink>
                  </li>
                  <li className="level-one">
                    <NavLink to="/superuser-requests">
                      <span className="mr-3">
                        <FeatherIcon icon="clipboard" size="15" />
                      </span>
                      Requests
                    </NavLink>
                  </li>
                  <li className="level-one">
                    <NavLink to="/superuser-locations">
                      <span className="mr-3">
                        <FeatherIcon icon="clipboard" size="15" />
                      </span>
                      Delivery Area
                    </NavLink>
                  </li>
                  <li className="level-one mt-3">
                    <NavLink to="/">
                      <span className="mr-3">
                        <FeatherIcon icon="log-out" size="15" />
                      </span>
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </nav>
            )
          : showMenu && (
              <nav className="main_nav ">
                <ul>
                  {is_owner ? (
                    <li className="level-one mb-lg-3">
                      <NavLink to="/dashboard">
                        <span className="mr-3">
                          <FeatherIcon icon="layout" size="15" />
                        </span>
                        Dashboard
                      </NavLink>
                    </li>
                  ) : null}
                  <li className="level-one">
                    <NavLink to="/live-orders">
                      <span className="mr-3">
                        <FeatherIcon icon="server" size="15" />
                      </span>
                      Live orders
                    </NavLink>
                  </li>
                  {/* <li className="level-one">
                    <NavLink to="/inventory">
                      <span className="mr-3">
                        <FeatherIcon icon="clipboard" size="15" />
                      </span>
                      Inventory
                    </NavLink>
                  </li> */}
                  <li className="level-one">
                    <NavLink to="/order-history">
                      <span className="mr-3">
                        <FeatherIcon icon="book" size="15" />
                      </span>
                      Order history
                    </NavLink>
                  </li>
                  {/* <li className="level-one  mb-lg-3">
                    <NavLink to="/pause-orders">
                      <span className="mr-3">
                        <FeatherIcon icon="pause-circle" size="15" />
                      </span>
                      Pause orders
                    </NavLink>
                  </li> */}

                  <li className="level-one  mb-lg-3">
                    <NavLink to="/management">
                      <span className="mr-3">
                        <FeatherIcon icon="layout" size="15" />
                      </span>
                      Management
                    </NavLink>
                  </li>

                  <li className="level-one">
                    <Link to="#0">
                      <span className="mr-3">
                        <FeatherIcon icon="volume-2" size="15" />
                      </span>
                      Marketing
                      <span className="subMenuIcon">
                        <FeatherIcon icon="chevron-right" size="17" />
                      </span>
                    </Link>
                    <ul className="subMenu">
                      <li className="level-two">
                        <Link to="#0">
                          Branding
                          <span className="subMenuIcon">
                            <FeatherIcon icon="chevron-right" size="17" />
                          </span>
                        </Link>

                        <ul className="innerSubMenu">
                          {brandings?.map((brand, idx) => {
                            return (
                              <li key={`marketing-brand-${idx}`}>
                                <Link
                                  to={`/brand/${brand.id}/${brand.sub_domain}/marketing`}
                                >
                                  {brand.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                      <li>
                        <Link to="/discounts">Discount</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="level-one  mb-lg-3">
                    <NavLink to="/customers">
                      <span className="mr-3">
                        <FeatherIcon icon="users" size="15" />
                      </span>
                      Customers
                    </NavLink>
                  </li>

                  <li className="level-one">
                    <Link to="#0">
                      <span className="mr-3">
                        <FeatherIcon icon="book-open" size="15" />
                      </span>
                      Menu
                      <span className="subMenuIcon">
                        <FeatherIcon icon="chevron-right" size="17" />
                      </span>
                    </Link>
                    <ul className="subMenu">
                      {this.props.brandings?.map((branding) => {
                        return (
                          <li className="level-two" key={branding.id}>
                            <Link to="#0">
                              {branding.name}
                              <span className="subMenuIcon">
                                <FeatherIcon icon="chevron-right" size="17" />
                              </span>
                            </Link>
                            <ul className="innerSubMenu">
                              <li>
                                <Link
                                  to={`/menu/${branding.id}/${branding.sub_domain}/items-modifiers`}
                                >
                                  Items and Modifiers
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to={`/menu/${branding.id}/${branding.sub_domain}/modifier`}
                                >
                                  Modifiers List
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to={`/menu/${branding.id}/${branding.sub_domain}/menus`}
                                >
                                  Menus
                                </Link>
                              </li>
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                  {/* <li className="mb-2">
                <NavLink to="/outlets">
                  <span className="mr-3">
                    <FeatherIcon icon="layout" size="15" />
                  </span>
                  Outlets
                </NavLink>
              </li> */}
                </ul>

                <ul className="bottom-nav-list">
                  <li className="level-one">
                    <NavLink to="/about">
                      <span className="mr-3">
                        <FeatherIcon icon="layout" size="15" />
                      </span>
                      About
                    </NavLink>
                  </li>
                  <li className="level-one">
                    <NavLink to="/users">
                      <span className="mr-3">
                        <FeatherIcon icon="user-plus" size="15" />
                      </span>
                      Users
                    </NavLink>
                  </li>
                  <li className="level-one">
                    <Link to="#0">
                      <span className="mr-3">
                        <FeatherIcon icon="user" size="15" />
                      </span>
                      Account User
                      <span className="subMenuIcon">
                        <FeatherIcon icon="chevron-right" size="17" />
                      </span>
                    </Link>
                    <ul className="subMenu">
                      <li>
                        <Link to="/my-profile">
                          <span className="mr-3">
                            <FeatherIcon icon="user" size="15" />
                          </span>
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <span className="mr-3">
                            <FeatherIcon icon="log-out" size="15" />
                          </span>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            )}
      </>
    );
  }
}
// isCollapsed &&
const mapStateToProps = (state) => {
  return {
    user: state.login_auth.user,
    brandings: state.company.brandings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default withRouter(
  connect(mapStateToProps, { mapDispatchToProps })(NavBar)
);
