import React, { Component } from "react";
import {
  MDBCardBody,
  MDBCard,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBAlert
} from "mdbreact";
import axios from "axios";

export default class SearchTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [{}],
      description: ""
    };

    this.addNote = this.addNote.bind(this);
    this.textOnChange = this.textOnChange.bind(this);
  }

  addNote() {
    const notes = this.state.notes;
    const description = this.state.description;
    notes.push({ description });
    this.setState({
      notes: notes
    });
  }

  textOnChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  render() {
    return (
      <div>
        <MDBCard className="my-12 px-12 pb-12">
          <MDBCardBody className="">
            <h2 className="h1-responsive font-weight-bold text-center my-5">
              Additional Notes
            </h2>
            <p className="text-center w-responsive mx-auto mb-5">
              Add any additional
              <strong> Important</strong> notes here
              
            </p>
            <small style={{color:"gray"}}>(These notes are <strong>temporary</strong> and only visible to you)</small>
            <br />
            <MDBContainer>
              <MDBRow>
                <MDBCol className="col-md-12 col-12">
                  <div className="form-group">
                    <textarea
                      value={this.state.description}
                      onChange={this.textOnChange}
                      className="form-control"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <MDBBtn onClick={this.addNote}>Add</MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol className="col-md-12 col-12">
                  {this.state.notes.map((note, id) => {
                    return id === 0 ? (
                      <p></p>
                    ) : (
                      <MDBAlert color="success" dismiss>
                        {note.description}
                      </MDBAlert>
                    );
                  })}
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
}
