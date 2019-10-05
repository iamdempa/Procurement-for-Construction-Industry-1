import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBContainer
} from "mdbreact";
import { NavLink } from "react-router-dom";
import SearchTableVendors from "./searchtable-vendors";

export default class Vendors extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MDBCard className="my-12 px-12 pb-12">
          <MDBCardBody className="">
            <h2 className="h1-responsive font-weight-bold text-center my-5">
              Vendors
            </h2>
            <p className="text-center w-responsive mx-auto mb-5">
              Search and know the vendors
              <strong> before making a Purchase Order</strong>
            </p>

            <MDBContainer className="container-fluid">
              <MDBRow>
                <MDBCol className="col-md-12 col-12">
                  <SearchTableVendors />
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
        <br />
      </div>
    );
  }
}
