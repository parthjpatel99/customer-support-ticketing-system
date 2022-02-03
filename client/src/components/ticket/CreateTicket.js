import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createTicket } from "../../actions/authActions";
import classnames from "classnames";
import { GET_ERRORS } from "../../actions/types";
import axios from "axios";
//import { Checkbox } from "react-materialize";

class CreateTicket extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      message: "",
      errors: {},
      success: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      title: this.state.title,
      message: this.state.message,
    };
    axios
      .post("/api/ticket/createticket", newTicket)
      .then((res) => console.log(res))
      .then(() => this.setState({ success: true }))
      .catch((err) => this.setState({ errors: err }));
  };
  render() {
    const { errors } = this.state;
    const { success } = this.state;
    return (
      <div className="container">
        <h4>
          <b>Create</b> Ticket
        </h4>

        <div className="row">
          <form noValidate className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">title</i>
                <input
                  onChange={this.onChange}
                  value={this.state.title}
                  error={errors.title}
                  id="title"
                  type="text"
                  className={classnames("", {
                    invalid: errors.title,
                  })}
                />

                <label htmlFor="title">Title</label>
                <span className="red-text">{errors.title}</span>
              </div>

              <div className="input-field col s12">
                <i className="material-icons prefix">message</i>
                <textarea
                  onChange={this.onChange}
                  value={this.state.message}
                  error={errors.message}
                  id="message"
                  className={classnames("", {
                    invalid: errors.message,
                  })}
                  class="materialize-textarea"
                ></textarea>
                <label htmlFor="message">Message</label>
                <span className="red-text">{errors.message}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  CREATE
                </button>
              </div>
            </div>
          </form>
          {success ? (
            <p style={{ color: "green" }}>Created successfully</p>
          ) : (
            <p>Not Yet Created</p>
          )}
        </div>
        <Link to="/userdashboard" className="btn-flat waves-effects">
          <i className="material-icons left">keyboard_backspace</i> Back to
          Dashboard
        </Link>
      </div>
    );
  }
}
CreateTicket.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps)(CreateTicket);
