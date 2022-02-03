import React, { Component } from "react";
import { Link } from "react-router-dom";

class CreateExecutive extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <h4>
          <b>Add</b> Executive
        </h4>
        <Link to="/userdashboard" className="btn-flat waves-effects">
          <i className="material-icons left">keyboard_backspace</i> Back to
          Dashboard
        </Link>
      </div>
    );
  }
}

export default CreateExecutive;
