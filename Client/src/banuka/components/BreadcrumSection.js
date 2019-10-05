import React, { Component } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBFormInline,
  MDBBtn
} from "mdbreact";
import { NavLink } from "react-router-dom";

export default class BreadcrumSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      viewOneInvoice: false
    };
  }

  componentDidMount() {
    let getPathName = window.location.pathname;
    let pathName = "";
    if (getPathName === "/banuka/dashboard") {
      pathName = "dashboard";
      this.setState({
        viewOneInvoice: false
      });
    } else if (getPathName === "/banuka/create") {
      pathName = "create";
      this.setState({
        viewOneInvoice: false
      });
    } else if (getPathName === "/banuka/view") {
      pathName = "view";
      this.setState({
        viewOneInvoice: false
      });
    } else { // -> /banuka/view/2
      
      pathName = "invoice - " + this.props.invoiceid;
      
      this.setState({
        viewOneInvoice: true
      });
    }

    this.setState({
      url: pathName
    });
  }

  render() {
    return (
      <MDBCard>
        <MDBCardBody
          id="breadcrumb"
          className="d-flex align-items-center justify-content-between"
        >
          {this.state.viewOneInvoice ? (
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <NavLink to="/banuka/dashboard">Dashboard</NavLink>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <NavLink to="/banuka/view">Invoices</NavLink>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>{this.state.url}</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          ) : (
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <NavLink to="/banuka/dashboard">Dashboard</NavLink>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>{this.state.url}</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          )}
        </MDBCardBody>
      </MDBCard>
    );
  }
}
