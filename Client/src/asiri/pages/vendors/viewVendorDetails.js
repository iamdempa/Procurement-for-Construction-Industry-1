import React, {Component} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBAnimation, MDBJumbotron, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBIcon, MDBCard, MDBDataTable
} from "mdbreact";
import SectionContainer from "../../../components/sectionContainer";
const axios = require('axios');
const env = require('dotenv').config();

class ViewVendorDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : '',
            dataSet : [],
            items : []
        };
    }

    testClickEvent(param) {
        console.log(param);
    }


    componentDidMount() {
        const self = this;
        const id = this.props.match.params.id;
        // Make a request to fetch data
        axios.get('http://34.93.185.34:3001/api/v1/vendors/'+id)
            .then(function (response) {
                console.log(response);
                self.setState({dataSet: response.data, message: response.message})
            })
            .then(function (response) {
                // Make a request to fetch data
                axios.get('http://34.93.185.34:3001/api/v1/items/')
                    .then(function (response1) {
                        console.log(response1);
                        self.filteredData = response1.data.filter(d => d.vendor === id);
                        self.state.items.push(response1.data);
                        console.log('arr1', response1.data);

                        self.itemsArr = {columns: [
                            {
                                label: "Item Name",
                                field: "itemName",
                                width: 150,
                                attributes: {
                                    "aria-controls": "DataTable",
                                    "aria-label": "Name"
                                }
                            },
                            {
                                label: "Description",
                                field: "description",
                                width: 270
                            },
                            {
                                label: "Item ID",
                                field: "_id",
                                width: 200
                            },
                            {
                                label: "Item Code",
                                field: "itemCode",
                                sort: "asc",
                                width: 100
                            },
                            {
                                label: "Unit Price",
                                field: "unitPrice",
                                sort: "disabled",
                                width: 150
                            },
                            {
                                label: "VendorID",
                                field: "dateAdded",
                                sort: "disabled",
                                width: 100
                            },
                                {
                                    label: "Date Added",
                                    field: "ateAdded",
                                    sort: "disabled",
                                    width: 150
                                },
                                {
                                    label: "Quantity",
                                    field: "quantity",
                                    sort: "disabled",
                                    width: 100
                                }
                        ],
                            rows: self.filteredData
                        }
                        self.setState({items: self.itemsArr})
                    })
            })
            .catch(function (error) {
                console.log(id);
            })
    }

    render(){
        return (
            <>
                <MDBContainer className="mt-5">
                    <MDBAnimation type="zoomIn" duration="500ms">
                        <MDBContainer>
                            <MDBRow className="mt-5">
                                <MDBCol>
                                    <SectionContainer noBorder header="">
                                        <MDBJumbotron>
                                            <MDBCardBody>
                                                <MDBCardTitle className="h2">{this.state.dataSet.vendorName}<small> [{this.state.dataSet.vendorCode}]</small></MDBCardTitle>
                                                <p className="my-4 font-weight-bold">{this.state.dataSet.vendorTagline}</p>
                                                <p className="my-4 font-weight-bold">{this.state.dataSet.vendorEmail}</p>
                                                <p className="my-4 font-weight-bold">{this.state.dataSet.vendorContactNumber}</p>
                                                <p className="my-4 font-weight-bold">{this.state.dataSet.vendorAddress}</p>
                                                <MDBCardText>
                                                    {this.state.dataSet.vendorDescription}
                                                </MDBCardText>
                                                <hr className="my-4" />
                                                <MDBDataTable striped bordered hover info={false} data={this.state.items} />
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

export default ViewVendorDetails;
