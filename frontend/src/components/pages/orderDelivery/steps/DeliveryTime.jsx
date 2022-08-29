import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

class DeliveryTime extends Component {
  state = {
    minutes: 40,
    seconds: 0,
  };

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { minutes, seconds } = this.state;

    return (
      <div className="text-center py-5">
        <p className="custom-text-primary my-4">
          <FontAwesomeIcon icon={faCheckCircle} size="3x" />
        </p>
        <h5 className="font-weight-semibold custom-text-primary">
          Order has been Confirmed!
        </h5>

        <h6 className="custom-text-primar">Delivery time remaining</h6>
        <h1 className="custom-text-primary font-weight-bold">
          {minutes === 0 && seconds === 0 ? (
            <h1>There is something wrong!</h1>
          ) : (
            <h1>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h1>
          )}
        </h1>
        <p className="text-muted font-weight-semibold">Minutes</p>

        {/* <button className="btn btn-primary">No, Proceed to Checkout</button> */}
      </div>
    );
  }
}

export default DeliveryTime;
