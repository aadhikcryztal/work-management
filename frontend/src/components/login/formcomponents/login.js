import React, { Component } from "react";
import imageUI2 from "../../../Assets/loginUI-2.png";
import Axios from "axios";
import "./css/login.css";

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: {},
      loaderOn: false,
    };
  }

  loginpageSubmit = async () => {
    this.setState({ loaderOn: true });
    let email = this.state.email;
    let password = this.state.password;
    let message = {};
    if(email !== "" && password !== ""){
    try {
      let response = await Axios.post("/api/squashapps/login", {
        email,
        password,
      });
      if (response.status === 200) {
        if (response.data.code === 200) {
          localStorage.setItem('token', response.data.token);
          message = { code: 200, info: "Logged successfully" };
          this.props.loginHandler();
        } else {
          message = { code: 400, info: response.data.info };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  else{
    message = { code : 400 , info : "Enter Valid details" }
  }
    this.setState({ message })
    setTimeout(() => {
      this.setState({ loaderOn: false, email: "", password: "", message:{}});
    }, 3000);
  };
  render() {
    return (
      <div className="loginpage">
        <div className="loginpage-ui-img">
          <img src={imageUI2} alt="email verification" />
        </div>
        <div className="loginpage-form">
          <div className="loginpage-form-title">Login to your app</div>
          <div className="loginpage-form-subtitle">
            To make a workspace from scratch, please confirm your email address.
          </div>
          <div className="loginpage-form-elements-section">
            <div className="loginpage-form-element">
              <label>Gmail</label>
              <input
                type="email"
                value = {this.state.email}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
                placeholder="Enter Your location"
              />
            </div>
            <div className="loginpage-form-element">
              <label>Password</label>
              <input
                type="text"
                value ={this.state.password}
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
                placeholder="Enter Your Password"
              />
            </div>
            <div className="loginpage-form-element col-2">
              <div>
                <input type="checkbox" value="Remind me" name="Remind me" />
                <label>Remind me</label>
              </div>
              <div>Forget Password ?</div>
            </div>
            <button
              className="loginpage-email-submit profilesubmit"
              onClick={() => this.loginpageSubmit()}
            >
              Sign In
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

            <div className="loginpage-message">
              {this.state.message.code === 400 ? (
                <p className="alert-info">{this.state.message.info}.</p>
              ) : this.state.message.code === 200 ? (
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
