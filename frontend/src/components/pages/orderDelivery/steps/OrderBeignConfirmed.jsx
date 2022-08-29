import React, { Component } from "react";

class OrderBeignConfirmed extends Component {
  state = {
    minutes: 3,
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
        <h5 className="font-weight-semibold custom-text-primary">
          Order is Being Confirmed
        </h5>
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
      </div>
    );
  }
}

export default OrderBeignConfirmed;
