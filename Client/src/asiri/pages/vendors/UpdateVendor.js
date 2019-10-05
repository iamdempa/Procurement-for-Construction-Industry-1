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

class UpdateVendor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : '',
            dataSet : [],
            items : [],
            vendorCode: '',
            vendorName: '',
            vendorEmail: '',
            vendorPaymentID: '',
            vendorContactPerson: '',
            vendorDescription: '',
            vendorAddress: '',
            vendorCountry: '',
            vendorContactNumber: '',
            vendorTagline: '',
            vendorImage: ''
        };
    }

    testClickEvent(param) {
        console.log(param);
    }

    genarateVendorID = (e) => {
        let gen = e.target.value;
        gen = 'VN' + String(md5(gen)).substring(0, 6).toUpperCase();
        this.setState({ vendorCode: gen  });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        if(e.target.name === 'vendorName'){
            this.genarateVendorID(e)
        }
    };

    onSubmitForm = (e) => {
        try {
            const res = axios.post('http://34.93.185.34:3001/api/v1/items', this.state);
            alert('👉 Returned data:')
        } catch (e) {
            alert(`😱 Axios request failed: ${e}`)
        }
    };

    componentDidMount() {
        const self = this;
        const id = this.props.match.params.id;
        // Make a request to fetch data
        axios.get('http://34.93.185.34:3001/api/v1/vendors/'+id)
            .then(function (response) {
                console.log(response);
                self.setState({dataSet: response.data, message: response.message})
            })
            .catch(function (error) {
                console.log(id);
            })
    }

    render(){
        const {vendorCode, vendorName,vendorEmail,vendorPaymentID,vendorContactPerson,vendorDescription,vendorAddress,vendorCountry,vendorContactNumber,vendorTagline,vendorImage} = this.state;

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

export default UpdateVendor;
