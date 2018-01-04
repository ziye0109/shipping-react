import React from "react";
import  './Notification.css';

class Notification extends React.Component {
  constructor() {
    super();
    this.state = { someKey: "someValue" };
  }

  render() {
    return (
      <div className={`notification ${this.props.type} notification-side`}>
        <button className="delete" />
        <strong>{this.props.message}</strong>
      </div>
    );
  }

  componentDidMount() {}
}

export default Notification;
