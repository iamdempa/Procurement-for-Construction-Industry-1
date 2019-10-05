import React, {Component} from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBAnimation, MDBJumbotron, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBIcon, MDBCard, MDBDataTable, MDBInput
} from "mdbreact";
import SectionContainer from "../../../components/sectionContainer";
import {confirmAlert} from "react-confirm-alert";
const axios = require('axios');
const env = require('dotenv').config();
const md5 = require('md5');

class UpdateVendor extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            const id = this.props.match.params.id;
            confirmAlert({
                title: '👉 Confirm',
                message: 'Are you sure?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => axios.put('http://34.93.185.34:3001/api/v1/vendors/'+id, this.state).then(response => {
                            console.log(response);
                        }).catch(error => {
                            console.log(error);
                        })
                    },
                    {
                        label: 'No',
                        onClick: () => console.log(`😱 Axios request failed`)
                    }
                ]
            });
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`)
        }
    };

    componentDidMount() {
        const self = this;
        const id = this.props.match.params.id;
        // Make a request to fetch data
        axios.get('http://34.93.185.34:3001/api/v1/vendors/'+id)
            .then(function (response) {
                console.log(response);
                console.log('👉 Returned data:')
                self.setState({
                    vendorCode: response.data.vendorCode,
                    vendorName: response.data.vendorName,
                    vendorEmail: response.data.vendorEmail,
                    vendorPaymentID: response.data.vendorPaymentID,
                    vendorContactPerson: response.data.vendorContactPerson,
                    vendorDescription: response.data.vendorDescription,
                    vendorAddress: response.data.vendorAddress,
                    vendorCountry: response.data.vendorCountry,
                    vendorContactNumber: response.data.vendorContactNumber,
                    vendorTagline: response.data.vendorTagline,
                    vendorImage: response.data.vendorImage,
                    message: response.message
                })
            })
            .catch(function (e) {
                console.log(`😱 Axios request failed: ${e}`)
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
                                                <MDBCardTitle className="h2">{vendorName}<small> [{vendorCode}]</small></MDBCardTitle>
                                                <hr className="my-4" />
                                                        <SectionContainer>
                                                            <form >
                                                                <div className="form-row">
                                                                    <div className="form-group col-md-6">
                                                                        <MDBInput label="VendorID (Auto)" hint={vendorCode} disabled type="text" />
                                                                        <input className="form-control"
                                                                               id="vendorCode"
                                                                               placeholder="Vendor Code"
                                                                               type="text"
                                                                               name="vendorCode"
                                                                               value={vendorCode}
                                                                               hidden
                                                                        />
                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputPassword4">Vendor Name</label>
                                                                        <input className="form-control"
                                                                               id="vendorName"
                                                                               placeholder="Vendor Name"
                                                                               type="text"
                                                                               name="vendorName"
                                                                               value={vendorName}
                                                                               onChange={this.onChange}
                                                                               required
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="form-row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputEmail4">Vendor Email</label>
                                                                        <input className="form-control"
                                                                               id="vendorEmail"
                                                                               placeholder="Vendor Email"
                                                                               type="email"
                                                                               name="vendorEmail"
                                                                               value={vendorEmail}
                                                                               onChange={this.onChange}
                                                                               required
                                                                        />
                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputPassword4">PaymentID</label>
                                                                        <input className="form-control"
                                                                               id="vendorPaymentID"
                                                                               placeholder="PaymentID"
                                                                               type="text"
                                                                               name="vendorPaymentID"
                                                                               value={vendorPaymentID}
                                                                               onChange={this.onChange}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="form-row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputEmail4">Contact Person</label>
                                                                        <input className="form-control"
                                                                               id="vendorContactPerson"
                                                                               placeholder="Contact Person"
                                                                               type="text"
                                                                               name="vendorContactPerson"
                                                                               value={vendorContactPerson}
                                                                               onChange={this.onChange}
                                                                        />
                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputPassword4">Contact Number</label>
                                                                        <input className="form-control"
                                                                               id="vendorContactNumber"
                                                                               placeholder="Contact Number"
                                                                               type="text"
                                                                               name="vendorContactNumber"
                                                                               value={vendorContactNumber}
                                                                               onChange={this.onChange}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="form-row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputEmail4">Country</label>
                                                                        <input className="form-control"
                                                                               id="vendorCountry"
                                                                               placeholder="Country"
                                                                               type="text"
                                                                               name="vendorCountry"
                                                                               value={vendorCountry}
                                                                               onChange={this.onChange}
                                                                        />
                                                                    </div>
                                                                </div>


                                                                <div className="form-row">
                                                                    <div className="form-group col-md-6">
                                                                        <label htmlFor="inputEmail4">Tagline</label>
                                                                        <input className="form-control"
                                                                               id="vendorTagline"
                                                                               placeholder="Tagline"
                                                                               type="text"
                                                                               name="vendorTagline"
                                                                               value={vendorTagline}
                                                                               onChange={this.onChange}
                                                                        />
                                                                    </div>
                                                                    <div className="form-group col-md-6">
                                                                        <img src={vendorImage} width="20px" className="img" />
                                                                        <label htmlFor="inputPassword4"> Image URL</label>
                                                                        <input className="form-control"
                                                                               id="vendorImage"
                                                                               placeholder="Image URL"
                                                                               type="text"
                                                                               name="vendorImage"
                                                                               value={vendorImage}
                                                                               onChange={this.onChange}
                                                                        />
                                                                    </div>
                                                                </div>


                                                                <div className="form-group">
                                                                    <label htmlFor="inputAddress">Description</label>
                                                                    <textarea
                                                                        className="form-control"
                                                                        rows="5"
                                                                        id="vendorDescription"
                                                                        placeholder="Description"
                                                                        type="text"
                                                                        name="vendorDescription"
                                                                        value={vendorDescription}
                                                                        onChange={this.onChange}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="inputAddress">Address</label>
                                                                    <input className="form-control"
                                                                           id="vendorAddress"
                                                                           placeholder="Address"
                                                                           type="text"
                                                                           name="vendorAddress"
                                                                           value={vendorAddress}
                                                                           onChange={this.onChange}
                                                                    />
                                                                </div>
                                                                <a onClick={this.onSubmitForm} className="btn btn-primary btn-md">
                                                                   Update
                                                                </a>
                                                            </form>
                                                        </SectionContainer>
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
