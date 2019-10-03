import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";
import { NavLink } from "react-router-dom";



export default class Vendors extends Component {
  constructor(props) {
    super(props);

    
  }

  render() {
    return (
      <div >
        <MDBCard className="my-12 px-12 pb-12">
          <MDBCardBody className="">
            <h2 className="h1-responsive font-weight-bold text-center my-5">
              Create a Purchase Invoice
            </h2>
            <p className="text-center w-responsive mx-auto mb-5">
              Creating purchase invoices
              <strong> Without having a Purchase Order</strong>
            </p>

            <h1>Hi</h1>
          </MDBCardBody>
        </MDBCard>
        <br />
      </div>
    );
  }
}
