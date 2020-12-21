import React, { Component } from "react";
import Axios from "axios";
import "./css/announcementcard.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faComment,
  faLocationArrow,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default class announcementcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "Event",
      comment: "",
      comments: [],
      retriveAllComments: [],
      commentsNumber: [],
      viewedAnnouncement: {},
      announcements: [],
      statusMessage: { code:"", message: "" },
      showmessage: false,
      fullModeAnnouncement: true,
    };
  }
  componentDidMount = () => {
    this.setState(
      { announcements: this.props.announcementArray.reverse() },
      () => {
        this.retrivingAllComments();
      },
    );
  };

  componentWillReceiveProps = (nextprops) => {
    if (nextprops.announcementArray !== this.state.announcements)
      this.setState(
        { announcements: nextprops.announcementArray.reverse() },
        () => {
          this.retrivingAllComments();
        },
      );
  };

  getCommentNumbers = () => {
    let commentsNumber = [];
    this.state.announcements.forEach((announcement, index) => {
      let count = 0;
      this.state.retriveAllComments.forEach((comment, index) => {
        if (announcement._id === comment.announcement_id) {
          count += 1;
        }
      });
      let newCount = { id: announcement._id, count: count };
      commentsNumber.push(newCount);
      this.setState({
        commentsNumber,
      });
    });
  };

  viewAnnouncement = (selectedAnnouncement) => {
    this.setState(
      {
        viewedAnnouncement: { ...selectedAnnouncement },
        fullModeAnnouncement: false,
      },
      () => {
        let partition_2 = document.querySelector("#partition-2");
        partition_2.style.display = "flex";
        this.retrivingComments();
      },
    );
  };

  retrivingAllComments = async () => {
    let response = await Axios.get(`/api/squashapps/retrivingallcomment/`);
    this.setState(
      {
        retriveAllComments: response.data,
      },
      () => {
        console.log(this.state.retriveAllComments);
        this.getCommentNumbers();
      },
    );
  };

  retrivingComments = async () => {
    let stringId = String(this.state.viewedAnnouncement._id);
    let response = await Axios.get(
      `/api/squashapps/retrivingcomment/?id=${stringId}`,
    );
    this.setState(
      {
        comments: response.data,
      },
      () => {
        this.getCommentNumbers();
      },
    );
  };

  sendComment = async () => {
    let comment = this.state.comment;
    let commentObject = {
      id: this.state.viewedAnnouncement._id,
      comments: comment,
    };
    let response = await Axios.post(
      "/api/squashapps/createcomments",
      commentObject,
    );
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
    }, 3000);
    let commentField = document.querySelector(".comment-input");
    commentField.value = "";
    this.retrivingComments();
  };

  closePartition = () => {
    this.setState({ fullModeAnnouncement: true });
    let partition_2 = document.querySelector("#partition-2");
    partition_2.style.display = "none";
  };
  render() {
    return (
      <div className="Announcementcards flexAnnouncements">
        <div
          className={
            this.state.fullModeAnnouncement
              ? "Announcementcard-lists"
              : "Announcementcard-lists partition-1"
          }
        >
          {this.state.announcements.map((singleAnnouncement, index) => (
            <div className="Announcement-card" key={index}>
              <div className="Announcement-sender">
                <div
                  className={
                    singleAnnouncement.category === "Announcement"
                      ? "Announcement-sender-initial Announcement-category-1"
                      : singleAnnouncement.category === "Event"
                      ? "Announcement-sender-initial Announcement-category-2"
                      : "Announcement-sender-initial Announcement-category-3"
                  }
                >
                  A
                </div>
              </div>
              <div className="Announcement-details">
                <div className="Announcement-details-row1">
                  <div className="Announcement-title">
                    {singleAnnouncement.subject}
                  </div>
                  <div className="Announcement-mini-data">
                    <div
                      className="Announcement-comment"
                      onClick={() => this.viewAnnouncement(singleAnnouncement)}
                    >
                      <FontAwesomeIcon icon={faComment} />
                      {this.state.commentsNumber.map(
                        (commentNumber, index) => {
                            if(singleAnnouncement._id === commentNumber.id)
                            return<span key={index} className="comment-number">
                              {commentNumber.count}
                            </span>
                            ;
                        }
                      )}
                    </div>
                    <div className="Announcement-createddate">04 Feb, 2019</div>
                  </div>
                </div>
                <div className="Announcement-details-row2">
                  {singleAnnouncement.description}
                </div>
                {singleAnnouncement.category === "Event" ? (
                  <div className="Announcement-details-row3">
                    <div className="Announcement-event-date">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="icon-events"
                      />{" "}
                      <span className="icon-text">
                        {singleAnnouncement.time}
                      </span>
                    </div>
                    <div className="Announcement-event-location">
                      <FontAwesomeIcon
                        icon={faLocationArrow}
                        className="icon-events"
                      />
                      <span className="icon-text">
                        {singleAnnouncement.location}
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="Announcementcard-view" id="partition-2">
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
          <div className="Announcementcard-viewed">
            <div className="Announcementcard-commenteduser">
              <div className="Announcementcard-commenteduser-details">
                <div
                  className={
                    this.state.viewedAnnouncement.category === "Announcement"
                      ? "Announcement-viewed-comment-initial Announcement-category-1"
                      : this.state.viewedAnnouncement.category === "Event"
                      ? "Announcement-viewed-comment-initial Announcement-category-2"
                      : "Announcement-viewed-comment-initial Announcement-category-3"
                  }
                >
                  A
                </div>
                <div className="Announcementcard-comment-user ">
                  {this.state.viewedAnnouncement.subject}
                </div>
              </div>
              <div className="Announcementcard-commented-comment-detail">
                <div className="Announcementcard-comment-time">
                  04 Feb, 2019, 3:35PM
                </div>
                <div
                  className="Announcementcard-comment-close"
                  onClick={() => this.closePartition()}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
            </div>
            <div className="Announcement-viewed-comment commented-top">
              {this.state.viewedAnnouncement.description}
            </div>
          </div>
          <div className="Announcementcard-viewed-comments-title-section">
            <p className="Announcementcard-viewed-comments-title">Comments</p>
            <p className="Announcementcard-viewed-replies-count">
              {this.state.comments.length} replies
            </p>
          </div>
          <div className="Announcementcard-viewed-comments">
            {this.state.comments.map((comment, index) => (
              <div
                className="Announcementcard-comment-card"
                style={{ gap: "5px" }}
                key={index}
              >
                <div className="Announcementcard-commenteduser">
                  <div className="Announcementcard-commenteduser-details">
                    <div
                      className={
                        this.state.category === "Announcement"
                          ? "Announcement-viewed-comment-initial Announcement-category-1"
                          : this.state.category === "Event"
                          ? "Announcement-viewed-comment-initial Announcement-category-2"
                          : "Announcement-viewed-comment-initial Announcement-category-3"
                      }
                    >
                      A
                    </div>
                    <div className="Announcementcard-comment-user">
                      Personal Documents
                    </div>
                  </div>
                  <div className="Announcementcard-commented-comment-detail">
                    <div className="Announcementcard-comment-time">
                      04 Feb, 2019, 3:35PM
                    </div>
                  </div>
                </div>
                <div className="Announcement-viewed-comment">
                  {comment.comments}
                </div>
              </div>
            ))}
          </div>
           <div className="Announcements-viewed-comment-write">
            <textarea
              type="text"
              placeholder="Be a first comment"
              className="comment-input"
              onChange={(e) =>
                this.setState({
                  comment: e.target.value,
                })
              }
            />
            <FontAwesomeIcon
              icon={faLocationArrow}
              onClick={() => this.sendComment()}
              className="icon-events comment-submit"
            />
          </div> 
        </div>
      </div>
    );
  }
}
