import React, { Component } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faEye,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

class ModifierListCollapse extends Component {
  state = { isEditable: false };

  handleEditItem = (e) => {
    e.preventDefault();
    this.setState({ isEditable: !this.state.isEditable });
    console.log("Editable: ", this.state.isEditable);
  };

  render() {
    return (
      <div
        className="modifier-list-wrap table-responsive"
        id="modifierListCollapse"
      >
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
                <p>Tomato</p>
              </div>
              <div className="box">
                <ul className="lists-group d-flex">
                  <li>
                    <strong>Type : </strong>
                    <span>Multiple</span>
                  </li>
                  <li>
                    <strong>Min : </strong>
                    <span>4</span>
                  </li>
                  <li>
                    <strong>Max : </strong>
                    <span>1</span>
                  </li>
                  <li>
                    <strong>Modifiers (5)</strong>
                  </li>
                  <li>
                    <a href="" onClick={this.handleEditItem}>
                      <FontAwesomeIcon icon={faEdit} />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <FontAwesomeIcon icon={faEye} />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <FontAwesomeIcon icon={faTrash} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {this.state.isEditable !== false && (
            <div className="edit-item p-3 border-to border-botto">
              <div className="row">
                <div className="col-sm">
                  <div className="input-group  input-group-sm">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Type
                      </span>
                    </div>
                    <select name="" id="" className="custom-select">
                      <option value="">Multiple</option>
                      <option value="">Single</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Min
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value="4"
                    />
                  </div>
                </div>
                <div className="col-sm ">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Max
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value="1"
                    />
                  </div>
                </div>
                <div className="col-auto">
                  <div className="btn-group">
                    <a href="" className="btn">
                      <FontAwesomeIcon icon={faCheck} />
                    </a>
                    <a href="" className="btn" onClick={this.handleEditItem}>
                      <FontAwesomeIcon icon={faTimes} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            id="modifierCollapse"
            className="collapse hide inner-content"
            aria-labelledby="headingOne"
            data-parent="#modifierListCollapse"
          >
            <ul className="list-group">
              <li>
                <span>Tomato base</span>
                <span>BDT 100.00</span>
              </li>
              <li>
                <span>Tomato base</span>
                <span>BDT 100.00</span>
              </li>
              <li>
                <span>Tomato base</span>
                <span>BDT 100.00</span>
              </li>
              <li>
                <span>Tomato base</span>
                <span>BDT 100.00</span>
              </li>
              <li>
                <span>Tomato base</span>
                <span>BDT 100.00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ModifierListCollapse;
