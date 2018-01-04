import React from "react";
import "./CarrierDetails.css";

class CarrierDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      //isRequestFormOpen: '' ,//is-active means modal is open, '' means modal is closed.
      isDetailTabSelected: "open",
      isOrderTabSelected: "close",
      isPickupTabSelected: "close",
      isTrackTabSelected: "close",
      isDocumentTabSelected: "close"
    };
  }

  selectDetailTab = e => {
    this.setState({
      isDetailTabSelected: "open",
      isOrderTabSelected: "close",
      isPickupTabSelected: "close",
      isTrackTabSelected: "close",
      isDocumentTabSelected: "close"
    });
  };
  selectOrderTab = e => {
    this.setState({
      isDetailTabSelected: "close",
      isOrderTabSelected: "open",
      isPickupTabSelected: "close",
      isTrackTabSelected: "close",
      isDocumentTabSelected: "close"
    });
  };
  selectPickupTab = e => {
    this.setState({
      isDetailTabSelected: "close",
      isOrderTabSelected: "close",
      isPickupTabSelected: "open",
      isTrackTabSelected: "close",
      isDocumentTabSelected: "close"
    });
  };
  selectTrackTab = e => {
    this.setState({
      isDetailTabSelected: "close",
      isOrderTabSelected: "close",
      isPickupTabSelected: "close",
      isTrackTabSelected: "open",
      isDocumentTabSelected: "close"
    });
  };
  selectDocumentTab = e => {
    this.setState({
      isDetailTabSelected: "close",
      isOrderTabSelected: "close",
      isPickupTabSelected: "close",
      isTrackTabSelected: "close",
      isDocumentTabSelected: "open"
    });
  };

  printCurrentSelectCarrier = () => {
    console.log("current selected carrier:");
    console.log(this.props.carrierDetails);

    return this.props.carrierDetails.mcnumber;
  };


  renderMcNumbers =() =>{

    return  this.props.carrierDetails.mcnumber.map(mcNumber=>{

      return(

               <span class="tag is-danger is-small carrier-mcnumber">
                        {mcNumber}
                      </span>
        )
    })
      
      
 

  }

  render() {

    if(Object.keys(this.props.carrierDetails).length===0){

      return <div></div>
    }

    return (
      <div className={`modal ${this.props.isRequestFormOpen}`}>
        <div className="modal-background" onClick={this.props.closeModal} />

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Carrier Details</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.closeModal}
            />
          </header>
          <section className="modal-card-body">
            <div className="carrier-quotesection-quote-mcNumber" />

            <div className="tabs is-boxed is-small is-fullwidth is-toggle-rounded">
              <ul>
                <li
                  className={`${this.state.isDetailTabSelected === "open"
                    ? "is-active"
                    : ""}`}
                >
                  <a onClick={this.selectDetailTab}>Carrier Info</a>
                </li>
                <li
                  className={`${this.state.isOrderTabSelected === "open"
                    ? "is-active"
                    : ""}`}
                >
                  <a onClick={this.selectOrderTab}>Bill of Lading</a>
                </li>
                <li
                  className={`${this.state.isPickupTabSelected === "open"
                    ? "is-active"
                    : ""}`}
                >
                  <a onClick={this.selectPickupTab}>Schedule Pickup</a>
                </li>
                <li
                  className={`${this.state.isTrackTabSelected === "open"
                    ? "is-active"
                    : ""}`}
                >
                  <a onClick={this.selectTrackTab}>Track Shippment</a>
                </li>
                <li
                  className={`${this.state.isDocumentTabSelected === "open"
                    ? "is-active"
                    : ""}`}
                >
                  <a onClick={this.selectDocumentTab}>Documents</a>
                </li>
              </ul>
            </div>

            <div
              className={`carrier-detail-section ${this.state
                .isDetailTabSelected}`}
            >
              <div>
                <div className="carrier-detail-section-avator">
                  <img src={this.props.carrierDetails.logo} />
                </div>
                <div className="carrier-detail-section-action">
                  <div className="carrier-detail-section-action-button">
                    {" "}
                    <a className="button is-success is-fullwidth   is-rounded is-small">
                      Add{" "}
                    </a>{" "}
                  </div>
                  <div className="carrier-detail-section-action-button">
                    <a className="button is-warning is-fullwidth  is-rounded is-small">
                      Edit{" "}
                    </a>{" "}
                  </div>
                  <div className="carrier-detail-section-action-button">
                    <a className="button is-info is-fullwidth   is-rounded is-small">
                      Option
                    </a>{" "}
                  </div>
                </div>
              </div>

              <table className="table is-hoverable  is-fullwidth ">
                <tbody>
                  <tr>
                    <td>NAME:</td>
                    <td>{this.props.carrierDetails.carrierName}</td>
                  </tr>
                  <tr>
                    <td>MC-NUMBER:</td>
                    <td>
                      {this.renderMcNumbers()}
                    </td>
                  </tr>
                  <tr>
                    <td>USERNAME:</td>
                    <td>{this.props.carrierDetails.userName}</td>
                  </tr>
                  <tr>
                    <td>PASSWORD:</td>
                    <td>{this.props.carrierDetails.password}</td>
                  </tr>
                  <tr>
                    <td>ACCOUNT:</td>
                    <td>{this.props.carrierDetails.accountNo}</td>
                  </tr>
                  <tr>
                    <td>WEB SERVICE URL:</td>
                    <td>
                      <a href={this.props.carrierDetails.url}>
                        {this.props.carrierDetails.url}
                      </a>
                    </td>
                  </tr>
                 


      

                  <tr>
                    <td>TRACKING:</td>
                    <td>{this.props.carrierDetails.tracking}</td>
                  </tr>

                  <tr>
                    <td>DOCUMENT:</td>
                    <td>{this.props.carrierDetails.document}</td>
                  </tr>

                  <tr>
                    <td>PICKUP:</td>
                    <td>{this.props.carrierDetails.pickup}</td>
                  </tr>

                  <tr>
                    <td>ORDER:</td>
                    <td>{this.props.carrierDetails.order}</td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div
              className={`carrier-order-section ${this.state
                .isOrderTabSelected}`}
            >
              <label class="label">Request Body</label>
              <div class="control">
                <textarea
                  class="textarea"
                  rows="25"
                  onChange={this.updateQuoteRequest}
                />
              </div>
            </div>

            <div
              className={`carrier-pickup-section ${this.state
                .isPickupTabSelected}`}
            >
              <label class="label">Request Body</label>
              <div class="control">
                <textarea
                  class="textarea"
                  rows="25"
                  onChange={this.updateQuoteRequest}
                />
              </div>
            </div>

            <div
              className={`carrier-track-section ${this.state
                .isTrackTabSelected}`}
            >
              <label class="label">Request Body</label>
              <div class="control">
                <textarea
                  class="textarea"
                  rows="25"
                  onChange={this.updateQuoteRequest}
                />
              </div>
            </div>

            <div
              className={`carrier-document-section ${this.state
                .isDocumentTabSelected}`}
            >
              Get Documents
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success">Save</button>
            <button className="button">Cancel</button>
          </footer>
        </div>
      </div>
    );
  }

  componentWillMount() {
     
    console.log("component will mount");
    console.log(this.props.carrierDetails);

  }


  componentDidMount() {}
}

export default CarrierDetails;
