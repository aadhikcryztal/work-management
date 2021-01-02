import React from "react";
import "./css/dashboard.css";
import Leftpanel from "./panels/leftpanel";
import Rightpanel from "./panels/rightpanel";
import Navigationpanel from "./panels/navigationpanel";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalBg: false,
      announcements: [],
      announcement_toshow : [],
      announcementForm: false,
    };
  }

  updateAnnouncements = (announcements) => {
    this.setState({ announcements,
    announcement_toshow : announcements }, ()=>{
    });
  };

  announcementFormHandler = () => {
    this.setState({ announcementForm: !this.state.announcementForm });
  };

  showModalBg = () => {
    this.setState({
      modalBg: !this.state.modalBg,
    });
  };

  searchAnnouncement = (term) => {
    var re = new RegExp(term, "i");
    let announcement_searched = [];
    this.state.announcements.forEach((announcement) => {
      if (announcement.subject.match(re)) {
        announcement_searched.push(announcement);
      }
    });
    this.setState({ announcement_toshow: announcement_searched });
  };

  loginHandler = () =>{
    this.props.loginHandler();
  }
  render() {
    return (
      <div className="Dashboard">
        <div
          className={this.state.modalBg ? "modal-bg show" : "modal-bg"}
        ></div>
        <div className="Dashboard-leftpanel">
          <Leftpanel loginHandler = {()=>this.loginHandler()} ></Leftpanel>
        </div>
        <div className="Dashboard-navigationpanel">
          <Navigationpanel
            showModalBg={() => this.showModalBg()}
            announcementFormFunc={()=>this.announcementFormHandler()}
            searchFunc = {(term)=>this.searchAnnouncement(term)}
          ></Navigationpanel>
        </div>
        <div className="Dashboard-rightpanel">
          <Rightpanel
            announcementFormFunc={()=>this.announcementFormHandler()}
            updateAnnouncements={(announcements) =>
              this.updateAnnouncements(announcements)
            }
            showModalBg={() => this.showModalBg()}
            announcements = {this.state.announcement_toshow}
            announcementForm = {this.state.announcementForm}
          ></Rightpanel>
        </div>
      </div>
    );
  }
}
