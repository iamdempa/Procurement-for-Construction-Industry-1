import React, {Component} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBAnimation,
    MDBJumbotron,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBIcon,
    MDBCard,
    MDBDataTable,
    MDBTable,
    MDBTableHead, MDBTableBody, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBModal
} from "mdbreact";
import SectionContainer from "../../../components/sectionContainer";
const axios = require('axios');
const env = require('dotenv').config();

class ViewAllItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : '',
            items2 : [],
            modal6: false,
            vendorId : ''
        };
    }

    testClickEvent(param) {
        console.log(param);
    }


    componentDidMount() {
        const self = this;
                // Make a request to fetch data
                axios.get('http://34.93.185.34:3001/api/v1/items/')
                    .then(function (response1) {
                        console.log(response1);
                        self.setState({items2: response1.data})
                    })
            .catch(function (error) {
                console.log(error);
            })
    }

    toggle = id => () => {
        const vendorId = id;
        let modalNumber = 'modal' + 6
        this.setState({
            [modalNumber]: !this.state[modalNumber],
            vendorId : vendorId
        });
    }

    render(){
        return (
            <>
                <MDBContainer className="mt-5">

                    <MDBModal isOpen={this.state.modal6} toggle={this.toggle(6)} fullHeight position="left">
                        <MDBModalHeader toggle={this.toggle(8)}>{this.state.vendorId}</MDBModalHeader>
                        <MDBModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                        </MDBModalBody>
                        <MDBModalFooter>
                        </MDBModalFooter>
                    </MDBModal>

                    <MDBAnimation type="zoomIn" duration="500ms">
                        <MDBContainer>
                            <MDBRow className="mt-5">
                                <MDBCol>
                                    <SectionContainer noBorder header="">
                                        <MDBJumbotron>
                                            <h1>Inventory</h1>
                                            <MDBCardBody>
                                                <hr className="my-4" />
                                                <MDBTable striped>
                                                    <MDBTableHead>
                                                        <th>Item Code</th>
                                                        <th>Item Name</th>
                                                        <th>Vendor</th>
                                                        <th>Description</th>
                                                        <th>Unit Price</th>
                                                        <th>Available</th>
                                                        <th>Updated</th>
                                                        <th></th>
                                                    </MDBTableHead>
                                                    <MDBTableBody>
                                                    {this.state.items2.map((data, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{data.itemCode}</td>
                                                                <td>{data.itemName}</td>
                                                                <td>{data.vendor}</td>
                                                                <td>{data.description}</td>
                                                                <td>{data.untiPrice}</td>
                                                                <td>{data.quantityAvailable}</td>
                                                                <td>{data.dateAdded}</td>
                                                                <td><a className="btn btn-outline-light-blue btn-sm" color="info" onClick={this.toggle(data._id)}>Vendor</a></td>

                                                            </tr>
                                                        )
                                                    })}
                                                    </MDBTableBody>
                                                </MDBTable>

                                            </MDBCardBody>
                                        </MDBJumbotron>
                                    </SectionContainer>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBAnimation>
                </MDBContainer>
            </>
        );
    }

};

export default ViewAllItems;
