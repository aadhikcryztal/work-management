import React, { Component } from "react";
import Axios from "axios";
import "./css/emailverification.css";
import imageUI1 from "../../../Assets/loginUI-1.png";

export default class emailverification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
      loaderOn: false,
    };
  }
  sendEmail = async () => {
    this.setState({ loaderOn: true });
    try {
      if (this.state.email !== "") {
        let response = await Axios.post("/api/squashapps/verifyemail", {
          email: this.state.email,
        });
        if (response.status === 200) {
          this.props.emailSent(response.data.code, this.state.email);
        }
        if (response.status === 201) {
          this.setState({
            message: { code: 400, info: "Email address is already registered" },
            loaderOn: false,
          });
        }
      } else {
        this.setState({
          message: { code: 400, info: "Please enter valid email address" },
          loaderOn: false,
        });
      }
    } catch (error) {
      this.setState({
        message: { code: 400, info: "Enter valid email address" },
        loaderOn: false,
      });
    }

    setTimeout(() => {
      this.setState({ message: "", email: "" });
    }, 3000);
  };
  render() {
    return (
      <div className="emailverification">
        <div className="emailverification-ui-img">
          <img src={imageUI1} alt="email verification" />
        </div>
        <div className="emailverification-form">
          <div className="email-form-title">
            Make Your Life Easy with Intranet!
          </div>
          <div className="email-form-subtitle">
            To make a workspace from scratch, please confirm your email address.
          </div>
          <div className="email-form-elements-section">
            <div className="email-form-element">
              <label>Email Address</label>
              <input
                type="email"
                value={this.state.email}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
                placeholder="name@email.com"
              />
            </div>
            <button
              className="form-email-submit"
              onClick={() => this.sendEmail()}
            >
              Confirm Email
              {this.state.loaderOn ? (
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                ""
              )}
            </button>
          </div>
          <div className="emailverification-message">
            {this.state.message.code === 400 ? (
              <p className="alert-info">{this.state.message.info}.</p>
            ) : (
            ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
