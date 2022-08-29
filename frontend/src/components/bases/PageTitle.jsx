import React, { Component } from "react";

class PageTitle extends Component {
  render() {
    return (
      <div className="row mt-4">
        <div className="col">
          <h4 className="text-mute page-titl mb-3">{this.props.page_title}</h4>
        </div>
      </div>
    );
  }
}

export default PageTitle;
