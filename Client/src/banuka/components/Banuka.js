import React, { Component } from "react";
import SideNavigation from "./sideNavigation";
import './index.css';


export default class Banuka extends Component {
  render() {
    return (
      <div className="flexible-content">
        {/* <TopNavigation /> */}
        <SideNavigation  />


        {/* <main id="content" className="p-5">
          <Routes/>
        </main> */}   

        {/* <Footer /> */}
      </div>
    );
  }
}
