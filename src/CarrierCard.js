import React from "react";
import "./CarrierCard.css";
import Notification from "./Notification.js";
import FontAwesome from "react-fontawesome";

class CarrierCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isRequestSectionOpen: "close"
    };
  }

  //Render mc numbers
  renderMcNumbers = () => {
    let mcNumbers = this.props.carrierMcNumber.split(" ");
    let mcNumbersTag = mcNumbers.map(mcNumber => {
      return (
        <span className="tag is-light carrier-quotesection-quote-mcNumber">
          {mcNumber}
        </span>
      );
    });

    return mcNumbersTag;
  };

  render() {
    return (
      <li className="carrier-quotesection-card">
        <div
          className="carrier-quotesection-quote"
          onClick={() =>
            this.props.toggleCarrierDetail(this.props.carrierMcNumber)}
        >
          <div className="carrier-quotesection-quote-logo">
            <div className="carrier-quotesection-quote-logo-size">
              <img src={this.props.carrierLogo} />
            </div>
          </div>

          <div className="carrier-quotesection-quote-carriername">
            <span> {this.props.carrierName}</span>
          </div>
          <div>
            <FontAwesome name="star" className="carrier-rating-star-checked" />
            <FontAwesome name="star" className="carrier-rating-star-checked" />
            <FontAwesome name="star" className="carrier-rating-star-checked" />
            <FontAwesome name="star" className="carrier-rating-star-checked" />
            <FontAwesome name="star" className="carrier-rating-star-checked" />
          </div>
          <div>
            <span className="carrier-quotesection-quote-price">
              {" "}
              {this.props.quote}{" "}
            </span>
          </div>
        </div>

        <div className={`carrier-quotesection-card-overlay close`}>
          <Notification message={this.props.message} />
        </div>
      </li>
    );
  }

  componentDidMount() {}
}

export default CarrierCard;
