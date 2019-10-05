import React, { Component } from "react";
import SideNavigation from "./sideNavigation";
import BreadCrumb from "./BreadcrumSection";
import DashbordCharts from "./Dashboard-charts";
import DashboardPieChart from "./Dashboard-piechart";
import DashboardTable1 from "./Dashboard-table1";
import { Link, NavLink } from "react-router-dom";

import Clock from "react-live-clock";

import SearchTable from './searchtable';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-3">
              <SideNavigation />
            </div>
            <div className="col-md-9 col-9">
              <BreadCrumb />
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-md-3 col-3"></div>
            <div className="col-md-9 col-9">
              <div className="row">
                <div className="col-md-1 col-1"></div>
                <div className="col-md-4 col-4 alert alert-info text-center">
                  <Clock
                    style={{ fontSize: "2.5em" }}
                    format={"h:mm:ss a"}
                    ticking={true}
                  />
                </div>
                <div className="col-md-1 col-1"></div>
                <div className="col-md-4 col-4 alert alert-info text-center">
                  <Clock
                    style={{ fontSize: "1.2em" }}
                    format={'Mo, dddd, YYYY'}
                    ticking={true}
                  />
                  <p style={{color:"lightpurple"}}>Have a Nice day!</p>
                </div>
                <div className="col-md-2 col-2"></div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 col-3"></div>
            <div className="col-md-9 col-9">
              <div className="row">
                <div className="col-md-6 col-6">
                  <DashboardPieChart />
                </div>
                <div className="col-md-6 col-6">
                  <DashbordCharts />
                </div>
              </div>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-md-3 col-3"></div>
            <div className="col-md-9 col-9">
              <h5>
                Purchase Invoices - Processed Invoices/Notes -
                <NavLink to="/banuka/create" style={{ color: "blue" }}>
                  <strong> New Item Invoice</strong>
                </NavLink>
              </h5>

              <SearchTable />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
