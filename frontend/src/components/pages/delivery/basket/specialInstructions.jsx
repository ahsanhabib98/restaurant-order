import React, { Component } from "react";

class SpecialInstructions extends Component {
  render() {
    return (
      <div className="special_instructions">
        {/* <h2>Special Instructions</h2> */}
        <form>
          <div className="form-group">
            <label htmlFor="" className="font-weight-bold">
              Special Instructions
            </label>
            <textarea
              className="form-control"
              placeholder="Add a note or any instructions"
              rows="3"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SpecialInstructions;
