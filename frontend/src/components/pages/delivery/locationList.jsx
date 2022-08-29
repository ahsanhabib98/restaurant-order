import FeatherIcon from "feather-icons-react";
import React, { Component } from "react";
import { locationListURL } from "../../../constants";
import axios from "axios";

class LocationList extends Component {
  state = {
    data: null,
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.loadLocationList();
  }

  loadLocationList() {
    this.setState({ loading: true });
    const subdomain = window.location.host.split(".")[0];
    axios
      .get(`${locationListURL}?subdomain=${subdomain}`)
      .then((res) => {
        this.setState({ data: res.data, loading: false });
        // console.log("Data: ", this.state.data);
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  }

  render() {
    const { data } = this.state;
    // TODO: check parent child location

    return (
      <div className="mt-2 item_list">
        <ul className="list-group">
          {/* {data &&
            data.map((location, i) => {
              return (
                <div key={location.id}>
                  <li className="parent_item px-0">
                    {"Dhaka"}{" "}
                    <span className="pr-0">{location.child.length}</span>
                  </li>
                  {location.child.map((location_child, j) => {
                    return (
                      <li
                        style={{ cursor: "pointer" }}
                        key={location_child.id}
                        onClick={(e) =>
                          this.props.handleLocation(location_child.id, 2)
                        }
                      >
                        {location_child.name}
                        <span className="pr-0">
                          <FeatherIcon icon="chevron-right" size="15" />
                        </span>
                      </li>
                    );
                  })}
                </div>
              );
            })} */}
          {data && (
            <div key={"location-parent"}>
              <p className="parent_item px-0  mb-0">
                Dhaka
                {/* <span className="pr-0">{location.child.length}</span> */}
              </p>
              {data.map((location_child, j) => {
                return (
                  <li
                    style={{ cursor: "pointer" }}
                    key={location_child.id}
                    onClick={(e) =>
                      this.props.handleLocation(location_child.id, 2)
                    }
                  >
                    {location_child.name}
                    <span className="pr-0">
                      <FeatherIcon icon="chevron-right" size="15" />
                    </span>
                  </li>
                );
              })}
            </div>
          )}
        </ul>
      </div>
    );
  }
}

export default LocationList;
