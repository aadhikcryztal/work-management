import React, { Component } from "react";
import "./css/landingnavigation.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";

export default class landingnavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  showLoginPageHandler = () => {
    this.props.showLoginPageHandler();
  };
  registerHandler = () => {
    this.props.registerHandler();
  };
  render() {
    return (
      <div className="landingnavigation">
        <div
          className="nav-title-section"
          onClick={() => this.registerHandler()}
        >
          SA-INTRANET
        </div>
        <div className="nav-tab-section">
          <div className="nav-tab" onClick={() => this.showLoginPageHandler()}>
            login
          </div>
          <div className="nav-tab email-tab">
            <FontAwesomeIcon icon={faInbox} />
            <p className="email-tab-email">support@squashapps.com</p>
          </div>
        </div>
      </div>
    );
  }
}
