import React, { Component } from "react";
import imageUI2 from "../../../Assets/loginUI-2.png";
import "./css/passwordcreation.css";

export default class passwordcreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      password: "",
      loaderOn: false,
      profileMessage : { code : ""}
    };
  }

  passwordCreationSubmit = () => {
    this.setState({ loaderOn: true });
    this.props.passwordcreationHandler(this.state);
  };

  componentWillReceiveProps(nextProps)
  {
    if(nextProps.profileMessage !== this.state.profileMessage)
    {
      this.setState({
        profileMessage : {code : nextProps.code, info : nextProps.info}
      })
    }
  }
  render() {
    return (
      <div className="passwordcreation">
        <div className="passwordcreation-ui-img">
          <img src={imageUI2} alt="email verification" />
        </div>
        <div className="passwordcreation-form">
          <div className="passwordcreation-form-title">
            Create Personal Password
          </div>
          <div className="passwordcreation-form-subtitle">
            To make a workspace from scratch, please confirm your email address.
          </div>
          <div className="passwordcreation-form-elements-section">
            <div className="passwordcreation-form-element col-2">
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  onChange={(e) => {
                    this.setState({ first_name: e.target.value });
                  }}
                  placeholder="Enter Your location"
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  onChange={(e) => {
                    this.setState({ last_name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="passwordcreation-form-element">
              <label>Password</label>
              <input
                type="text"
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
                placeholder="Customise your domain name"
              />
            </div>
            <button
              className="passwordcreation-email-submit profilesubmit"
              onClick={() => this.passwordCreationSubmit()}
            >
              Complete
              {this.state.loaderOn ? (
                <div class="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                ""
              )}
            </button>

            <div className="passwordcreation-message">
              {this.state.profileMessage.code === 400 ? (
                <p className="alert-info">
                  {this.state.message.info}.
                </p>
              ) : this.state.profileMessage.code === 200 ? (
                <p className="success-info">{this.state.message.info}</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
