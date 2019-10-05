import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBAnimation, MDBInput
} from "mdbreact";
import SectionContainer from "../../../components/sectionContainer";
import axios from "axios";
const md5 = require('md5');



class AddVendor extends Component {
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

        fillRandom = (e) => {
            this.setState({
                vendorCode: 'DGET73364',
                vendorName: 'Salini Impregilo',
                vendorEmail: 'SaliniIm@gmail.com',
                vendorPaymentID: '243-43534-435-36',
                vendorContactPerson: 'Ms.Anna',
                vendorDescription: 'Salini Impregilo S.p.A., listed on the Italian Stock Exchange,\n' +
                    'is an international company based in Italy.\n' +
                    'The Group is a global player in complex large-scale\n' +
                    'infrastructures and worldwide leader in the “water” sector.\n' +
                    'Its experience ranges from the construction of dams\n' +
                    'and hydroelectric plants, hydraulic structures and water\n' +
                    'infrastructures, to building roads and motorways, railways\n' +
                    'and metro systems, ports and maritime works, airports,\n' +
                    'underground works, civil engineering for\n' +
                    'waste-to-energy plants, public and industrial constructions, ',
                vendorAddress: 'EPT,242A, USA',
                vendorCountry: 'USA',
                vendorContactNumber: '523748229',
                vendorTagline: 'A quality-focused Group',
                vendorImage: 'https://www.lutz.us/wp-content/uploads/2017/06/6.30.2017_small.jpg' });
        }

        onSubmitForm = (e) => {
            try {
                confirmAlert({
                    title: '👉 Confirm',
                    message: 'Are you sure?',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => axios.post('http://34.93.185.34:3001/api/v1/vendors', this.state)
                        },
                        {
                            label: 'No',
                            onClick: () => console.log(`😱 Axios request failed`)
                        }
                    ]
                });
            } catch (e) {
                console.log(`😱 Axios request failed: ${e}`);
                confirmAlert({
                    title: 'Confirm to submit',
                    message: 'Are you sure to do this.',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => alert('Click Yes')
                        },
                        {
                            label: 'No',
                            onClick: () => alert('Click No')
                        }
                    ]
                });
            }
        };

        render() {
            const {vendorCode, vendorName,vendorEmail,vendorPaymentID,vendorContactPerson,vendorDescription,vendorAddress,vendorCountry,vendorContactNumber,vendorTagline,vendorImage} = this.state;
            return (
                <>
                    <MDBContainer className="mt-5">
                    <MDBAnimation type="zoomIn" duration="500ms">
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="8" className="mx-auto">
                                    <SectionContainer header="Add New Vendor">
                                        <form>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <MDBInput label="VendorID (Auto)" hint={vendorCode} disabled type="text" />
                                                    <input className="form-control"
                                                           id="vendorCode"
                                                           placeholder="VendorID"
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
                                                    <label htmlFor="inputPassword4">Image URL</label>
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
                                                <input className="form-control"
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
                                                Add Vendor
                                            </a>
                                            <a  onClick={this.fillRandom} className="btn btn-outline-dark btn-sm">
                                                Fill Sample Date
                                            </a>
                                        </form>
                                    </SectionContainer>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBAnimation>
                    </MDBContainer>
                </>
            )};
};

export default AddVendor;
