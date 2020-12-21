import React from "react";
import "./css/rightpanel.css";
import Axios from "axios";

import Announcementcard from './announcementcard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

export default class rightpanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      category: "",
      date: "",
      time: "",
      location: "",
      expires_on: "",
      description: "",
      notify_to: [],
      statusMessage: { code:"", message: "" },
      showmessage: false,
      showAnnouncementForm : false,
      announcements : []
    };
  }

  componentDidMount = () => {
    this.retriveAnnouncements()
  }

  addAnnouncement = () => {
    this.setState({showAnnouncementForm : true})
    this.props.showModalBg();
  };

  closeForm = () => {
    this.setState({showAnnouncementForm : false})
    this.props.showModalBg();
  };

  selectCategory = (categoryChoosen) => {
    let categories = document.querySelectorAll(`.input-form-category`);
    categories.forEach((category) => {
      if (category.id === categoryChoosen) {
        category.classList.add("category-active");
        this.setState({
          category: categoryChoosen,
        });
      } else {
        if (category.classList.contains("category-active")) {
          category.classList.remove("category-active");
        }
      }
    });
  };

  appendingMail = (event) => {
    if (event.keyCode === 188) {
      document.querySelector(".form-notifyto-inputbox").style.width =  "160px";
      document.querySelector(".form-notifyto-inputbox").style.marginTop =  "5px";
      document.querySelector(".form-notifyto-inputbox").placeholder = "Add more";
      this.setState(
        {
          notify_to: [
            ...this.state.notify_to,
            event.target.value.replace(",", ""),
          ],
        },
        () => {
          document.querySelector(".form-notifyto-inputbox").value = "";
        },
      );
    } else {
      document.querySelector(
        ".form-notifyto-inputbox",
      ).value = event.target.value.replace(",", "");
    }
  };

  removeEmail = (value) => {
    let formValue = document.querySelector(".form-notifyto-inputbox");
    formValue.value = formValue.value.replace(",", "");
    let notify_to = [...this.state.notify_to];
    notify_to.splice(value, 1);
    this.setState({
      notify_to,
    });
  };

  discardForm = () => {
    let formValue = document.querySelector(".form-notifyto-inputbox");
    formValue.value = "";
    this.selectCategory("");
    this.setState({
      subject: "",
      date: "",
      time: "",
      location: "",
      expires_on: "",
      description: "",
      notify_to: [],
    });
  };

  retriveAnnouncements = async() =>{
    let response = await Axios.get("/api/squashapps/retrivingpost");
    console.log(response.data)
    this.setState({announcements : response.data})
  }

  

  sendForm = async () => {
    console.log(this.state);
    let formdetails = {
      subject: this.state.subject,
      category: this.state.category,
      date: this.state.date,
      time: this.state.time,
      location: this.state.location,
      expires_on: this.state.expires_on,
      description: this.state.description,
      notify_to: this.state.notify_to,
    };
    let response = await Axios.post("/api/squashapps/createpost", formdetails);
    if (response.status === 200) {
      this.setState({
        statusMessage: {
          code: 200,
          message: "Announcement created Successfully",
        },
        showmessage: true,
      });
    } else {
      this.setState({
        statusMessage: { code: 400, message: "Error in creating announcement" },
        showmessage: true,
      });
    }
    setTimeout(() => {
      this.setState({ showmessage: false });
      this.discardForm();
      this.retriveAnnouncements();
    }, 3000);
  };
  render() {
    return (
      <div className="Rightpanel">
        <div className="Rightpanel-title-section">Announcements</div>
        <div className="Rightpanel-manipulationsection">
          <div className="Rightpanel-search-section">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Search" className="search-input" />
          </div>
          <div
            className="Rightpanel-plus-announcements"
            onClick={() => this.addAnnouncement()}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Add Announcement</span>
          </div>
        </div>
        {this.state.showAnnouncementForm ? <div className="Rightpanel-form-card">
          {this.state.showmessage ? (
            <div
              className={
                this.state.statusMessage.code === 200
                  ? "Rightpanel-form-card-message successmsg"
                  : "Rightpanel-form-card-message errormsg"
              }
            >
              {this.state.statusMessage.message}
            </div>
          ) : (
            ""
          )}
          <div className="Rightpanel-form-row form-title-section">
            <p className="form-title-text">Add New Announcement</p>
            <div className="form-card-close" onClick={() => this.closeForm()}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <div className="Rightpanel-form-row form-subject">
            <label className="form-label">Subject</label>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ subject: e.target.value });
              }}
              className="input-form-subject"
              value={this.state.subject}
            />
          </div>
          <div className="Rightpanel-form-row form-category">
            <label className="form-label">Select Category</label>
            <div className="form-category-section">
              <div
                className="input-form-category"
                onClick={() => this.selectCategory("Announcement")}
                id="Announcement"
              >
                Announcement
              </div>
              <div
                className="input-form-category"
                onClick={() => this.selectCategory("Event")}
                id="Event"
              >
                Event
              </div>
              <div
                className="input-form-category"
                onClick={() => this.selectCategory("Remainder")}
                id="Reminder"
              >
                Reminder
              </div>
            </div>
          </div>
          {this.state.category === "Event" ? (
            <div className="Rightpanel-form-row form-date-time">
              <div className="Rightpanel-form-row form-date">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  onChange={(e) => {
                    this.setState({ date: e.target.value });
                  }}
                  value={this.state.date}
                  className="form-date-input"
                />
              </div>
              <div className="Rightpanel-form-row form-time">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  value={this.state.time}
                  onChange={(e) => {
                    this.setState({ time: e.target.value });
                  }}
                  className="form-time-input"
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {this.state.category === "Event" ? (
            <div className="Rightpanel-form-row form-location">
              <label className="form-label">Location</label>
              <input
                value={this.state.location}
                type="text"
                onChange={(e) => {
                  this.setState({ location: e.target.value });
                }}
                className="form-location-input"
              />
            </div>
          ) : (
            ""
          )}

          {this.state.category === "Reminder" ? (
            <div className="Rightpanel-form-row form-expireon">
              <label>Expires on</label>
              <input
                type="date"
                value={this.state.expires_on}
                onChange={(e) => {
                  this.setState({ expires_on: e.target.value });
                }}
                className="form-expireon-input"
              />
            </div>
          ) : (
            ""
          )}
          <div className="Rightpanel-form-row form-description">
            <label className="form-label">Description</label>
            <textarea
              type="text"
              value={this.state.description}
              onChange={(e) => {
                this.setState({ description: e.target.value });
              }}
              className="form-description-input"
            />
          </div>
          <div className="Rightpanel-form-row form-notifyto">
            <label className="form-label">Notify To</label>
            <div type="text" className="form-notifyto-input">
              {this.state.notify_to.length > 0
                ? this.state.notify_to.map((mail, index) => (
                    <div
                      key={index}
                      className="
               notify-mail"
                    >
                      {mail}
                      <span
                        className="cancel-mail"
                        onClick={() => this.removeEmail(index)}
                      >
                        x
                      </span>
                    </div>
                  ))
                : ""}
              <input
                type="text"
                className="form-notifyto-inputbox"
                placeholder="Enter email and seperated by comma"
                onKeyDown={(e) => this.appendingMail(e)}
              />
            </div>
          </div>
          <div className="Rightpanel-form-row form-buttons">
            <button className="form-discard" onClick={() => this.discardForm()}>
              Discard
            </button>
            <button className="form-send" onClick={() => this.sendForm()}>
              Send
            </button>
          </div>
        </div> : "" }
        <div className="Announcement-cards">
          <Announcementcard announcementArray = {this.state.announcements} />
        </div>
      </div>
    );
  }
}
