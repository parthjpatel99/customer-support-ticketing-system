import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
//import required Components from package react-materialize
import { Collapsible, CollapsibleItem } from "react-materialize";
//react-materialize package dependent on materialize css

class UserDashboard extends Component {
  constructor() {
    super();
    this.state = {
      ticket: [],
      message: [],
      error: "",
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    if (user.role === "user") {
      axios
        .get("/api/ticket/userdashboard")
        .then((res) => {
          console.log(res.data);
          let tmpArray1 = [];
          let tmpArray2 = [];

          for (var i = 0; i < res.data.length; i++) {
            tmpArray1.push(res.data[i].conversation);
            for (var j = 0; j < res.data[i].conversation.length; j++) {}
            tmpArray2.push({
              msg: tmpArray1[i][0].message,
              title: res.data[i].title,
              _id: res.data[i]._id,
              status: res.data[i].status,
            });
          }

          this.setState({
            message: tmpArray2,
            ticket: [...this.state.ticket, ...res.data],
            loading: false,
          });
          console.log(this.state.ticket);
          console.log(this.state.message);
        })
        .catch(((err) => this.state.error: err));
    }

    if (user.role === "admin") {
      axios
        .get("/api/ticket/viewtickets")
        .then((res) => {
          console.log(res.data);
          let tmpArray1 = [];
          let tmpArray2 = [];

          for (var i = 0; i < res.data.length; i++) {
            tmpArray1.push(res.data[i].conversation);
            for (var j = 0; j < res.data[i].conversation.length; j++) {}
            tmpArray2.push({
              msg: tmpArray1[i][0].message,
              title: res.data[i].title,
              _id: res.data[i]._id,
              status: res.data[i].status,
            });
          }

          this.setState({
            message: tmpArray2,
            ticket: [...this.state.ticket, ...res.data],
            loading: false,
          });
          console.log(this.state.ticket);
          console.log(this.state.message);
        })
        .catch(((err) => this.state.error: err));
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onCreateClick = (e) => {
    e.preventDefault();
    this.props.history.push("/createticket");
  };

  onCreateExecClick = (e) => {
    e.preventDefault();
    this.props.history.push("/createexec");
  };
  // ticket data must be fetched from GET ("/userdashboard")
  render() {
    const { user } = this.props.auth;

    const { message } = this.state;

    return (
      <div>
        <div className="container">
          <h3>
            <b>Welcome</b>, {user.name}{" "}
          </h3>
          <h5>
            <b>Role </b>- {user.role}{" "}
          </h5>
          <hr />
          <i class="material-icons left">create</i>{" "}
          <h6>
            <b>Tickets Created </b>
          </h6>
          {/*sample accordion*/}
          <Collapsible accordion>
            {message.map((item) => (
              <CollapsibleItem
                key={item._id}
                expanded={false}
                header={item._id}
                node="div"
              >
                <b>Title: </b>
                {item.title}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b>Status: </b>
                {item.status}
                <br />
                <b>Message : </b>
                {item.msg}
              </CollapsibleItem>
            ))}
          </Collapsible>
          <button
            style={{
              margin: "150px 20px",
            }}
            class="btn waves-effect waves-light right blue"
            onClick={this.onLogoutClick}
          >
            Logout
            <i class="material-icons right">logout</i>
          </button>
          {user.role === "user" ? (
            <button
              style={{
                margin: "150px 20px",
              }}
              class="btn waves-effect waves-light left blue"
              onClick={this.onCreateClick}
            >
              Create Ticket
              <i class="material-icons right">create</i>
            </button>
          ) : (
            <button
              style={{
                margin: "150px 20px",
              }}
              class="btn waves-effect waves-light left blue"
              onClick={this.onCreateExecClick}
            >
              Add Executive
              <i class="material-icons right">add</i>
            </button>
          )}
        </div>
      </div>
    );
  }
}
UserDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(UserDashboard);
