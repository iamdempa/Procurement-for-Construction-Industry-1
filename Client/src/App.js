import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import SectionContainer from "./pages/DropdownPage";

class App extends Component {
  state = {
    collapseID: ""
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () => {
    window.scrollTo(0, 0);
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });
  };

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );

    const { collapseID } = this.state;

    return (
      <Router>
        <div className="flyout">
          <MDBNavbar color="indigo" dark expand="md" fixed="top" scrolling>
            <MDBNavbarBrand href="/" className="py-0 font-weight-bold">
              <Logo style={{ height: "2.5rem", width: "2.5rem" }} />
              <strong className="align-middle">Procurement System</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler
              onClick={this.toggleCollapse("mainNavbarCollapse")}
            />
            <MDBCollapse
              id="mainNavbarCollapse"
              isOpen={this.state.collapseID}
              navbar
            >
              <MDBNavbarNav right>

					<MDBNavItem>
					  <MDBDropdown>
						<MDBDropdownToggle nav caret>
						  <span className="mr-2">Inventory  Management</span>
						</MDBDropdownToggle>
						<MDBDropdownMenu>
						  <MDBDropdownItem href="/vendor/dashboard">Dashboard</MDBDropdownItem>
						  <MDBDropdownItem href="/vendor/add">Add New Item</MDBDropdownItem>
						  <MDBDropdownItem href="/v1/">Summary</MDBDropdownItem>
						</MDBDropdownMenu>
					  </MDBDropdown>
					</MDBNavItem>
					
					<MDBNavItem>
					  <MDBDropdown>
						<MDBDropdownToggle nav caret>
						  <span className="mr-2">Vendor Management</span>
						</MDBDropdownToggle>
						<MDBDropdownMenu>
						  <MDBDropdownItem href="/vendor/dashboard">Dashboard</MDBDropdownItem>
						  <MDBDropdownItem href="/vendor/add">Add New Item</MDBDropdownItem>
						  <MDBDropdownItem href="/v1/">Summary</MDBDropdownItem>
						</MDBDropdownMenu>
					  </MDBDropdown>
					</MDBNavItem>
					
					<MDBNavItem>
					  <MDBDropdown>
						<MDBDropdownToggle nav caret>
						  <span className="mr-2">Invoice Management</span>
						</MDBDropdownToggle>
						<MDBDropdownMenu>
						  <MDBDropdownItem href="/banuka/dashboard">Dashboard</MDBDropdownItem>
						</MDBDropdownMenu>
					  </MDBDropdown>
					</MDBNavItem>
					
					<MDBNavItem>
					  <MDBDropdown>
						<MDBDropdownToggle nav caret>
						  <span className="mr-2">Chinthaka</span>
						</MDBDropdownToggle>
						<MDBDropdownMenu>
						  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
						  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
						  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
						  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
						</MDBDropdownMenu>
					  </MDBDropdown>
					</MDBNavItem>
					
					<MDBNavItem>
					  <MDBDropdown>
						<MDBDropdownToggle nav caret>
						  <span className="mr-2">Vihanga</span>
						</MDBDropdownToggle>
						<MDBDropdownMenu>
						  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
						  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
						  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
						  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
						</MDBDropdownMenu>
					  </MDBDropdown>
					</MDBNavItem>
					

              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          {collapseID && overlay}
          <main style={{ marginTop: "4rem" }}>
            <Routes />
          </main>
          <MDBFooter color="indigo">
            <p className="footer-copyright mb-0 py-3 text-center">
              &copy; {new Date().getFullYear()} Copyright:
              Procurement System | Contributors Asiri, Vihaga, Jananath and Chinthaka
            </p>
          </MDBFooter>
        </div>
      </Router>
    );
  }
}

export default App;
