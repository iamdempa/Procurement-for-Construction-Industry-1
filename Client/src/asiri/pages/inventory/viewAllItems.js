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
    MDBTableHead, MDBTableBody
} from "mdbreact";
import SectionContainer from "../../../components/sectionContainer";
const axios = require('axios');
const env = require('dotenv').config();

class ViewAllItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : '',
            items2 : []
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
                        self.itemsArr2 = {columns: [
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
                            rows: response1.data
                        }
                        self.setState({items2: response1.data})
                    })
            .catch(function (error) {
                console.log(error);
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
                                                        <th>Updated</th>
                                                        <th>Action</th>
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
                                                                <td>{data.dateAdded}</td>
                                                                <td><MDBBtn color="dark-green" size="sm">Details</MDBBtn></td>

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
