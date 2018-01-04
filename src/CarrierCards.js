import React from "react";
import "./CarrierCards.css";
import CarrierCard from "./CarrierCard";
import CarrierCardAdd from "./CarrierCardAdd"

class CarrierCards extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  //render carrier cards
  renderCarriersCards() {

    if(Object.keys(this.props.carriers).length === 0){

      return
    }

    return this.props.carriers.data.carriers.map(carrier => {
      let quoteStatus = "open";


      return (
        <CarrierCard key={carrier.mcnumber}
          quote={carrier.rate.charge}
          carrierName={carrier.carrierName}
          quoteDate={carrier.rate.date}
          carrierMcNumber={carrier.mcnumber}
          carrierLogo={carrier.logo}
          quoteStatus={quoteStatus}
          isRequestSectionOpen="open"
          toggleCarrierDetail={this.props.toggleCarrierDetail}
        />
      );
    });
  }

  render() {
    return (
      <div className="carrier-quotesection">
        <div className="carrier-quotesection-action">
          <a
            className="button is-small is-link"
            onClick={this.props.requestQuoteForm}
          >
            Request Quote
          </a>
        </div>

        <ul className="carrier-quotesection-quotes">
          {this.renderCarriersCards()}
          <CarrierCardAdd/>
        </ul>
      </div>
    );
  }

  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextState){

    console.log('should component update hook');
    if(nextProps.carriers!==this.props.carriers){

      return true;

    }
    return false;


  }


}

export default CarrierCards;
