import React from "react";
import Dashboard from "./components/dashboard/dashboard";
import Landingpage from "./components/login/landingpage";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedSuccess: false,
      showLogin: false,
    };
  }
  componentDidMount = () => {
    this.loginHandler();
  };
  loginHandler = () => {
    if (localStorage.getItem("token")) this.setState({ isLoggedSuccess: true });
    else this.setState({ isLoggedSuccess: false });
  };

  showLoginPageHandler = () => {
    this.setState({ showLogin: true });
  };
  registerHandler = () => {
    this.setState({ showLogin: false });
  };
  render() {
    return (
      <div className="App">
        {this.state.isLoggedSuccess ? (
          <Dashboard loginHandler={() => this.loginHandler()}></Dashboard>
        ) : (
          <Landingpage
            showLoginPageHandler={() => this.showLoginPageHandler()}
            showLogin={this.state.showLogin}
            registerHandler={() => this.registerHandler()}
            loginHandler={() => this.loginHandler()}
          ></Landingpage>
        )}
      </div>
    );
  }
}
