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
import {confirmAlert} from "react-confirm-alert";
const axios = require('axios');
const env = require('dotenv').config();

class ViewAllItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : '',
            items2 : [],
            modal6: false,
            vendorId : '',
            modelData : []
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
        const self = this;
        const vendorId = id;
        let modalNumber = 'modal' + 6;
        this.setState({
            [modalNumber]: !this.state[modalNumber],
            vendorId : vendorId
        });
    }

    deleteItem(_id){
        const self = this;
        console.log(_id);
        if (_id != null){
            confirmAlert({
                title: '👉 Confirm',
                message: 'Are you sure?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => axios.delete('http://34.93.185.34:3001/api/v1/items/'+_id.toString())
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error)
                                self.forceUpdate()
                            })
                    },
                    {
                        label: 'No',
                        onClick: () => console.log(`😱 Axios request failed`)
                    }
                ]
            });
        }
    }

    render(){
        return (
            <>
                <MDBContainer className="mt-5">

                    <MDBModal isOpen={this.state.modal6} toggle={this.toggle(6)} fullHeight position="left">
                        <MDBModalHeader toggle={this.toggle(8)}>{this.state.vendorId}</MDBModalHeader>
                        <MDBModalBody>
                            <MDBCardText>

                            </MDBCardText>
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
                                                                <td>
                                                                    <MDBBtn href={'/vendor/details/'+data.vendor} color="light-blue" size="sm">
                                                                        <MDBIcon far icon="eye" />
                                                                    </MDBBtn>
                                                                    <MDBBtn onClick={(_id) => this.deleteItem(data._id)} color="danger" size="sm">
                                                                        <MDBIcon far icon="trash-alt" />
                                                                    </MDBBtn>
                                                                </td>
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
