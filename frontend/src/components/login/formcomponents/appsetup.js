import React, { Component } from "react";
import "./css/appsetup.css";
import imageUI2 from "../../../Assets/loginUI-2.png";

export default class appsetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyname: "",
      location: "",
      no_of_employees: "",
      domain_name: "",
    };
  }

  appsetupsubmit = () => {
    this.props.appsetupFormHandler(this.state)
  };
  render() {
    return (
      <div className="appsetup">
        <div className="appsetup-ui-img">
          <img src={imageUI2} alt="email verification" />
        </div>
        <div className="appsetup-form">
          <div className="appsetup-form-title">Setup Your Application</div>
          <div className="appsetup-form-subtitle">
            To make a workspace from scratch, please confirm your email address.
          </div>
          <div className="appsetup-form-elements-section">
            <div className="appsetup-form-element">
              <label>Company Name</label>
              <input
                type="text"
                onChange={(e) => {
                  this.setState({ companyname: e.target.value });
                }}
                placeholder="Enter Your Company Name"
              />
            </div>

            <div className="appsetup-form-element col-2">
              <div>
                <label>Location</label>
                <input
                  type="text"
                  onChange={(e) => {
                    this.setState({ location: e.target.value });
                  }}
                  placeholder="Enter Your location"
                />
              </div>
              <div>
                <label>No of Employees</label>
                <input
                  type="text"
                  onChange={(e) => {
                    this.setState({ no_of_employees: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="appsetup-form-element intranet-input">
              <label>Domain Name</label>
              <input
                type="text"
                onChange={(e) => {
                  this.setState({ domain_name: e.target.value });
                }}
                placeholder="Customise your domain name"
              />
              <div className="appsetup-intranetbtn">.intranet.com</div>
            </div>
            <button
              className="appsetup-email-submit"
              onClick={() => this.appsetupsubmit()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}
