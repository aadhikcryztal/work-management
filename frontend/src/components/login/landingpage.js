import React, { Component } from "react";
import Navigation from "./navs/landingnavigation";
import FormEmail from "../login/formcomponents/emailverification";
import VerifyCode from "../login/formcomponents/verificationcode";
import Appsetup from "../login/formcomponents/appsetup";
import Passwordcreation from "../login/formcomponents/passwordcreation";
import Login from "../login/formcomponents/login";
import Axios from "axios";
import "./css/landingpage.css";

export default class landingpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailEntered: false,
      verificationCode: 0,
      isEmailVerified: false,
      isEmailVerificationSucess: false,
      message: "",
      appsetupInputs: {},
      isappsetupCreated: false,
      showLoginPage: false,
      loggedSuccess: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showLogin !== this.state.showLoginPage) {
      this.setState({ showLoginPage: nextProps.showLogin });
    }
  }
  emailSent = (code, email) => {
    let appsetupInputs = { ...this.state.appsetupInputs };
    appsetupInputs.email = email;
    this.setState({
      emailEntered: true,
      verificationCode: code,
      appsetupInputs,
    });
  };

  checkCode = (inputs) => {
    let codeString = "";
    inputs.forEach((input) => (codeString += input));
    if (parseInt(codeString) === parseInt(this.state.verificationCode)) {
      this.setState({
        isEmailVerified: true,
        message: { code: 200, info: "Email verified Successfully" },
      });
    } else {
      this.setState({
        isEmailVerified: true,
        message: { code: 400, info: "Invalid Verification code" },
      });
    }

    setTimeout(() => {
      this.setState({ isEmailVerificationSucess: true });
    }, 3000);
  };

  appsetupFormHandler = (inputs) => {
    let appsetupInputs = { ...this.state.appsetupInputs };
    appsetupInputs.company_name = inputs.companyname;
    appsetupInputs.location = inputs.location;
    appsetupInputs.no_of_employees = inputs.no_of_employees;
    appsetupInputs.domain_name = inputs.domain_name;

    this.setState({
      appsetupInputs,
      appsetupCreated: true,
    });
  };

  passwordcreationHandler = async (inputs) => {
    let appsetupInputs = { ...this.state.appsetupInputs };
    appsetupInputs.first_name = inputs.first_name;
    appsetupInputs.last_name = inputs.last_name;
    appsetupInputs.password = inputs.password;

    await this.setState({ appsetupInputs });
    try {
      let response = await Axios.post(
        "/api/squashapps/register",
        this.state.appsetupInputs,
      );
      if (response.status === 200)
        this.setState({
          message: {
            code: 200,
            info: "Application setup has done successfully",
          },
        });

      setTimeout(() => {
        this.setState({ showLoginPage: true });
      }, 3000);
    } catch (err) {
      this.setState({
        message: { code: 400, info: "Error in creating Profile" },
      });
    }
  };

  showLoginPageHandler = () => {
    this.props.showLoginPageHandler();
  };

  registerHandler = () => {
    this.props.registerHandler();
  };

  loginHandler = () => {
    this.props.loginHandler();
  };

  render() {
    return (
      <div className="landingpage">
        <div className="landingpage-navigation">
          <Navigation
            showLoginPageHandler={() => this.showLoginPageHandler()}
            registerHandler={() => this.registerHandler()}
          />
        </div>
        <div className="landingpage-formsection">
          {!this.state.showLoginPage ? (
            <div>
              {!this.state.isEmailVerificationSucess ? (
                <div>
                  {this.state.emailEntered === false ? (
                    <FormEmail
                      emailSent={(code, email) => this.emailSent(code, email)}
                    ></FormEmail>
                  ) : (
                    <VerifyCode
                      checkCode={(inputs) => this.checkCode(inputs)}
                      isEmailVerified={this.state.isEmailVerified}
                      message={this.state.message}
                    ></VerifyCode>
                  )}
                </div>
              ) : (
                <div>
                  {!this.state.appsetupCreated ? (
                    <Appsetup
                      appsetupFormHandler={(inputs) =>
                        this.appsetupFormHandler(inputs)
                      }
                    ></Appsetup>
                  ) : (
                    <Passwordcreation
                      passwordcreationHandler={(inputs) =>
                        this.passwordcreationHandler(inputs)
                      }
                      profileMessage={this.state.message}
                    ></Passwordcreation>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Login loginHandler={() => this.loginHandler()}></Login>
          )}
        </div>
      </div>
    );
  }
}
