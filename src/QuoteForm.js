import React from "react";
import "./QuoteForm.css";


class QuoteForm extends React.Component {
  constructor() {
    super();

    this.state = {
      quoteRequest: "",
      carriers:{}
    };

    this.getCarriers = this.getCarriers.bind(this);
  }

  updateQuoteRequest = e => {
    this.setState({ quoteRequest: e.target.value });
  };

  getCarriers = () => {
    return this.props.carriersList;
  };

  RequestQuote = payloadString => {
    let requestPayload = JSON.parse(payloadString.toString());

    //Constructing request for each carriers
    let carriersQuotes = this.state.Carriers.data.carriers.map(carrierInfo => {
      let payloadTemplate = JSON.parse(JSON.stringify(requestPayload));

      payloadTemplate.data.ConnectionSettings.CompanyId = carrierInfo.mcnumber;
      payloadTemplate.data.ConnectionSettings.UserName = carrierInfo.userName;
      payloadTemplate.data.ConnectionSettings.Password = carrierInfo.password;
      payloadTemplate.data.ConnectionSettings.UserAuthToken = carrierInfo.accountNo;
      payloadTemplate.data.ConnectionSettings.ApiKey = carrierInfo.token;
      payloadTemplate.data.ConnectionSettings.AppAuthToken = "";

      return payloadTemplate;
    });

    //Send quote request
    let carriersQuotesP = carriersQuotes.map(quoteRequest => {
      console.log(quoteRequest);

      return fetch("http://172.30.200.12:4005/rate", {
        body: JSON.stringify(quoteRequest),
        method: "Post",
        mode: "cors"
      });
    });

    //Get Quotes Promises Array
    let QuotesP = carriersQuotesP.map(quoteP => {
      return quoteP
        .then(response => {
          if (!response.ok) {
            return response.text();
          }
          return response.json();
        })
        .catch(error => {
          console.log(error);
        });
    });

    //Update quote for each carrier
    Promise.all(QuotesP).then(quotesList => {
      //Make a new copy of carrierList
      console.log(this.getCarriers());

      let carrierList = JSON.parse(JSON.stringify(this.getCarriers()));

      quotesList.forEach((quote, index) => {

        if (Object.prototype.toString.call(quote) === "[object Object]") {
          let rate = quote.Rate;
          carrierList.data.carriers[index].rate.charge = rate;
          carrierList.data.carriers[index].rate.status.error = false;
          carrierList.data.carriers[index].rate.status.loading = false;
          carrierList.data.carriers[index].rate.status.requesting = false;
        } else {
          carrierList.data.carriers[index].rate.status.message = quote;
          carrierList.data.carriers[index].rate.status.error = true;
          carrierList.data.carriers[index].rate.status.loading = false;
          carrierList.data.carriers[index].rate.status.requesting = false;
        }


      });

      this.props.updateCarrierQuote(carrierList);

      console.log(quotesList);
    });
  };

  render() {
    return (
      <div className={`modal ${this.props.isQuoteRequestFormOpen}`}>
        <div className="modal-background" onClick={this.props.closeModal} />

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Quote Request</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.closeModal}
            />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Request Body</label>
              <div className="control">
                <textarea
                  className="textarea"
                  rows="25"
                  onChange={this.updateQuoteRequest}
                />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              onClick={() => this.RequestQuote(this.state.quoteRequest)}
            >
              Submit
            </button>
            <button className="button">Cancel</button>
          </footer>
        </div>
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

export default QuoteForm;
