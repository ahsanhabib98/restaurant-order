import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { itemListURL, orderURL } from "../../../../constants";

class Items extends Component {
  state = {
    loading: false,
    error: null,
    data: [],
  };

  componentDidMount() {
    const subdomain = window.location.host.split(".")[0];
    this.loadInventoryItems(subdomain);
  }

  loadInventoryItems(subdomain) {
    this.setState({ loading: true });
    axios
      .get(`${itemListURL}?subdomain=${subdomain}`)
      .then((res) => {
        this.setState({ data: res.data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  }

  render() {
    const { data } = this.state;
    const { locationID } = this.props;

    // console.log("Items: ", data);

    return (
      <>
        <div className="items-list">
          {data.map((item) => {
            return (
              <div
                className="items"
                key={item.id}
                onClick={(e) => this.props.handleItems(item.id, 3)}
              >
                <div className="item_content">
                  <h6 className="text-capitalize font-weight-semibold">
                    {item.title}
                  </h6>
                  <p className="text-muted">{item.description}</p>
                  <p className="font-weight-semibold mb-0">BDT {item.price}</p>
                </div>
                <div className="item_photo">
                  <img src={item.avatar} alt="item" className="rounded" />
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="brand_name">
          <h3 className="pl-3 mt-5">Friggy's</h3>
        </div>
        {data.map((item) => {
          return (
            <div key={item.id}>
              <div className="items_area mt-2 mb-2">
                <div className="item_content">
                  <div className="items">
                    <div
                      className="item_list pl-3 pr-3"
                      onClick={(e) => this.props.handleItems(item.id, 3)}
                    >
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <h4>BDT {item.price}</h4>
                    </div>
                  </div>
                </div>
                <div className="item_photo">
                  <img src={item.avatar} alt="item" />
                </div>
              </div>
            </div>
          );
        })} */}
      </>
    );
  }
}

export default Items;
