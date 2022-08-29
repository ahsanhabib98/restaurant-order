import React, { Component } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import AddItemsModal from "./AddItemsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faEllipsisV,
  faEye,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

class CollapseItem extends Component {
  render() {
    return (
      <>
        <div className="modifier-list-wrap" id="modifierListCollapse">
          <div className="modifier-list-item">
            <div className="modifier-item-header d-flex align-items-center">
              <a
                href=""
                className="btn btn-link p-0"
                data-toggle="collapse"
                data-target="#modifierCollapse"
                aria-expanded="false"
                aria-controls="modifierCollapse"
              >
                <FeatherIcon icon="chevron-right" size="15" />
              </a>

              <div className="d-flex justify-content-between align-items-center w-100 pl-4">
                <div className="box">
                  <p>Pizzas [SAMPLE]</p>
                </div>
                <div className="box">
                  <ul className="lists-group d-flex align-items-center">
                    <li>
                      <strong>Items (3) </strong>
                    </li>

                    <li className="dropdown ml-3">
                      <a
                        className="nav-link p-0"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="navbarDropdown"
                      >
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              id="modifierCollapse"
              className="collapse hide inner-content"
              aria-labelledby="headingOne"
              data-parent="#modifierListCollapse"
            >
              <ul className="list-group inner-list">
                <li>
                  <span>Pepperoni Pizza [SAMPLE]</span>
                  <div className="box ml-3">
                    <span>BDT 100.00</span>
                    <a href="" className="btn btn-sm ml-2">
                      <FontAwesomeIcon icon={faEye} />
                    </a>
                    <a href="" className="btn btn-sm">
                      <FontAwesomeIcon icon={faTimes} />
                    </a>
                  </div>
                </li>
                <li>
                  <span>Margherita Pizza [SAMPLE]</span>
                  <div className="box ml-3">
                    <span>BDT 100.00</span>
                    <a href="" className="btn btn-sm ml-2">
                      <FontAwesomeIcon icon={faEye} />
                    </a>
                    <a href="" className="btn btn-sm">
                      <FontAwesomeIcon icon={faTimes} />
                    </a>
                  </div>
                </li>
                <li>
                  <span>Chicken BBQ Pizza [SAMPLE]</span>
                  <div className="box ml-3">
                    <span>BDT 100.00</span>
                    <a href="" className="btn btn-sm ml-2">
                      <FontAwesomeIcon icon={faEye} />
                    </a>
                    <a href="" className="btn btn-sm">
                      <FontAwesomeIcon icon={faTimes} />
                    </a>
                  </div>
                </li>
              </ul>

              <a
                href=""
                className="btn btn-link font-weight-bold custom-text-primary p-0 mt-2"
              >
                Add Items
              </a>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* <div id="accordion">
          <div>
            <div className="row">
              <div className="col-md-5">
                <a
                  href="0"
                  className="btn btn-link"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <span className="mr-2">
                    <FeatherIcon icon="list" size="15" />
                  </span>
                  First Item
                  <span className="ml-2">
                    <FeatherIcon icon="edit-2" size="15" />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div
            id="collapseOne"
            className="collapse hide ml-5"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="row">
              <div className="col">
                <span className="mr-1">
                  <FeatherIcon icon="list" size="15" />
                </span>
                Peparoni pizza
              </div>
              <div className="col">BDT 50</div>
              <div className="col">
                <Link to="/menu/1/edit-items&modifiers">
                  <FeatherIcon icon="eye" size="15" />
                </Link>
              </div>
              <div className="col">
                <FeatherIcon icon="x" size="15" />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <AddItemsModal />
              </div>
            </div>
          </div>
        </div> */}
      </>
    );
  }
}

export default CollapseItem;
