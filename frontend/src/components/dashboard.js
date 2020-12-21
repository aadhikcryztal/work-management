import React from "react";
import "./css/dashboard.css";
import Leftpanel from "./panels/leftpanel";
import Rightpanel from "./panels/rightpanel";

export default class Dashboard extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      modalBg: false
    }
  }
  showModalBg = () =>{
    this.setState({
      modalBg : !this.state.modalBg
    })
  }
  render(){
  return (
    <div className="Dashboard">
      <div className={this.state.modalBg ? "modal-bg show": "modal-bg"}></div>
      <div className="Dashboard-leftpanel">
        <Leftpanel></Leftpanel>
      </div>
      <div className="Dashboard-rightpanel">
        <Rightpanel showModalBg = {()=>this.showModalBg()}></Rightpanel>
      </div>
    </div>
  );
  }
}
