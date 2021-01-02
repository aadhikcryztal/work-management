import React, { Component } from "react";
import "./css/navigationpanel.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

export default class navigationpanel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  addAnnouncement = () => {
    this.props.announcementFormFunc();
    this.props.showModalBg();
  };

  searchAnnouncement = (e) => {
   this.props.searchFunc(e.target.value)
  };

  render() {
    return (
      <div className="Rightpanel-navigation">
        <div className="Rightpanel-title-section">Announcements</div>
        <div className="Rightpanel-manipulationsection">
          <div className="Rightpanel-search-section">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => this.searchAnnouncement(e)}
              className="search-input"
            />
          </div>
          <div
            className="Rightpanel-plus-announcements"
            onClick={() => this.addAnnouncement()}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Add Announcement</span>
          </div>
        </div>
      </div>
    );
  }
}
