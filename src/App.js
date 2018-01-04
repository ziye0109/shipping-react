import React, { Component } from "react";
import "./App.css";
import "bulma/css/bulma.css";
import 'font-awesome/css/font-awesome.min.css';
import CarrierDetails from "./CarrierDetails";
import CarrierCards from "./CarrierCards";
import QuoteForm from "./QuoteForm";
import Notification from "./Notification";


class App extends Component {
  //will be using redux to manage state.
  state = {
    isRequestFormOpen: "close",
    carriers:{},
    isQuoteRequestFormOpen: "close",
    currentSelectedCarrier: {}
  };

  updateCarrierQuote = carriersWithUpdatedQuote => {
    this.setState({ carriers: carriersWithUpdatedQuote });
  };

  toggleCarrierDetail = carrierId => {
    console.log(`Show Carrier Id : ${carrierId}`);

    if (this.state.isRequestFormOpen === "is-active") {
      this.setState({ isRequestFormOpen: "" });
    } else {
      this.state.carriers.data.carriers
        .filter(carrier => {
          if (carrier.mcnumber === carrierId) {
            return true;
          } else {
            return false;
          }
        })
        .map(carrier => {
          console.log(carrier);

          this.setState({
            currentSelectedCarrier: carrier,
            isRequestFormOpen: "is-active"
          });
       
        });
    }
  };

  closeModal = e => {
    this.setState({ isRequestFormOpen: "" });
  };

  requestQuoteForm = () => {
    if (this.state.isQuoteRequestFormOpen === "is-active") {
      this.setState({ isQuoteRequestFormOpen: "" });
    } else {
      this.setState({ isQuoteRequestFormOpen: "is-active" });
    }
  };

  closeQuoteModal = e => {
    this.setState({ isQuoteRequestFormOpen: "" });
  };



  render() {
    return (
      <div className="App">
        <CarrierCards
          toggleCarrierDetail={this.toggleCarrierDetail}
          requestQuoteForm={this.requestQuoteForm}
          carriers={this.state.carriers}
        />

        <CarrierDetails
          isRequestFormOpen={this.state.isRequestFormOpen}
          closeModal={this.closeModal}
          carrierDetails={this.state.currentSelectedCarrier}
        />

        <QuoteForm
          isQuoteRequestFormOpen={this.state.isQuoteRequestFormOpen}
          closeModal={this.closeQuoteModal}
          requestTemplate={this.getCarrierQuoteRequestTemplate}
          updateCarrierQuote={this.updateCarrierQuote}
          carriersList={this.state.carriers}
        />
      </div>
    );
  }


 //Fetch carrier data
 componentDidMount() {




    fetch("./CarrierWebservices.json")
    .then(response=>{
      
      console.log(response);
      return response.json();
    
    })
    .then(data=>{

      console.log(data);
      this.setState({carriers:data});

    })

 }



}

export default App;
