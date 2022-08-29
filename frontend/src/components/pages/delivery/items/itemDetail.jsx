import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { itemDetailURL } from "../../../../constants";
import AddItemDetail from "./addItemDetail";
import ItemDetailInfo from "./itemDetailInfo";

export class ItemDetail extends Component {
  state = {
    loading: false,
    error: null,
    data: null,
  };

  componentDidMount() {
    this.handleFetchItem();
  }

  handleFetchItem = () => {
    const { itemID } = this.props;
    this.setState({ loading: true });
    axios
      .get(itemDetailURL(itemID))
      .then((res) => {
        this.setState({ data: res.data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const { data } = this.state;
    const { locationID } = this.props;
    if (!data) return null;
    return (
      <div className="item_details">
        <div className="img-box mb-3">
          <img src={data.avatar} alt="" />
        </div>

        <div className="item_detail_info px-3">
          <ItemDetailInfo item={data} locationID={locationID} />
          <AddItemDetail
            outletID={data.outlet}
            subdomain={this.props.subdomain}
            itemID={data.id}
            item={data}
            locationID={locationID}
            handleBasket={this.props.handleBasket}
            text_color={this.props.text_color}
            base_color={this.props.base_color}
            // previousButton={this.props.previousButton}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subdomain: state.login_auth.user.sub_domain,
  };
};

export default connect(mapStateToProps)(ItemDetail);
