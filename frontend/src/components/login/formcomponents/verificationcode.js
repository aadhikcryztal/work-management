import React, { Component } from "react";
import imageUI2 from "../../../Assets/loginUI-2.png";
import "./css/verificationcode.css";

export default class verificationcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: [],
      message: {},
    };
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.isEmailVerified) {
      if (nextprops.message.code === 200) {
        this.setState({
          message: {
            code: nextprops.message.code,
            info: nextprops.message.info,
          },
        });
      }
      if (nextprops.message.code === 400) {
        this.setState({
          message: {
            code: nextprops.message.code,
            info: nextprops.message.info,
          },
        });
      }
    }
  }

  verifyInput = () => {
    let inputsChecked = 0;
    this.state.inputs.forEach((input) => {
      if (
        input.length === 1 &&
        input.charCodeAt(0) >= 48 &&
        input.charCodeAt(0) <= 57
      ) {
        inputsChecked += 1;
      } else {
        this.setState({
          message: { code: 400, info: "Please enter valid numbers" },
        });
      }
    });

    if (inputsChecked === this.state.inputs.length) {
      this.setState({
        message: {},
      });
      this.props.checkCode(this.state.inputs);
    }
  };
  render() {
    return (
      <div className="verificationcode">
        <div className="verificationcode-ui-img">
          <img src={imageUI2} alt="verify code" />
        </div>
        <div className="verificationcode-form">
          <div className="emailverify-form-title">We’ve sent you a mail!</div>
          <div className="emailverify-form-subtitle">
            To make a workspace from scratch, please confirm your emailverify
            address.
          </div>
          <div className="emailverify-form-elements-section">
            <div className="emailverify-form-element">
              <label>Enter your verification code</label>
              <div className="emailverify-inputrow">
                <input
                  type="text"
                  onChange={(event) => {
                    let inputs = [...this.state.inputs];
                    inputs[0] = event.target.value;
                    this.setState({
                      inputs,
                    });
                  }}
                  className={
                    this.state.message.code === 400
                      ? "verify-input alert-border"
                      : "verify-input"
                  }
                />
                <input
                  type="text"
                  onChange={(event) => {
                    let inputs = [...this.state.inputs];
                    inputs[1] = event.target.value;
                    this.setState({
                      inputs,
                    });
                  }}
                  className={
                    this.state.message.code === 400
                      ? "verify-input alert-border"
                      : "verify-input"
                  }
                />
                <input
                  type="text"
                  onChange={(event) => {
                    let inputs = [...this.state.inputs];
                    inputs[2] = event.target.value;
                    this.setState({
                      inputs,
                    });
                  }}
                  className={
                    this.state.message.code === 400
                      ? "verify-input alert-border"
                      : "verify-input"
                  }
                />
                <input
                  type="text"
                  onChange={(event) => {
                    let inputs = [...this.state.inputs];
                    inputs[3] = event.target.value;
                    this.setState({
                      inputs,
                    });
                  }}
                  className={
                    this.state.message.code === 400
                      ? "verify-input alert-border"
                      : "verify-input"
                  }
                />
                <input
                  type="text"
                  onChange={(event) => {
                    let inputs = [...this.state.inputs];
                    inputs[4] = event.target.value;
                    this.setState({
                      inputs,
                    });
                  }}
                  className={
                    this.state.message.code === 400
                      ? "verify-input alert-border"
                      : "verify-input"
                  }
                />
                <input
                  type="text"
                  onChange={(event) => {
                    let inputs = [...this.state.inputs];
                    inputs[5] = event.target.value;
                    this.setState({ inputs }, () => {
                      this.verifyInput();
                    });
                  }}
                  className={
                    this.state.message.code === 400
                      ? "verify-input alert-border"
                      : "verify-input"
                  }
                />
              </div>
            </div>
            <div className="emailverify-message">
              {this.state.message.code === 400 ? (
                <p className="alert-info">
                  {this.state.message.info}.
                  <span style={{ color: "rgb(83, 205, 226)" }}>
                    {" "}
                    Resend now
                  </span>
                </p>
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
