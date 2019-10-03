import React, { Component } from "react";
import { MDBContainer, MDBAlert } from "mdbreact";

export default class ErrorMessageBelowSaveButton extends Component {
  render() {
    return (
      <MDBContainer>
        <MDBAlert color="danger" dismiss>
          Fields <strong> cannot be empty</strong>
        </MDBAlert>
      </MDBContainer>
    );
  }
}
