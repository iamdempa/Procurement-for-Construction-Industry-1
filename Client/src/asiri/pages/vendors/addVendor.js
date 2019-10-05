import React, { Component } from 'react';
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

        onSubmitForm = (e) => {
            try {
                const res = axios.post('http://34.93.185.34:3001/api/v1/items', this.state);
                alert('👉 Returned data:')
            } catch (e) {
                alert(`😱 Axios request failed: ${e}`)
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
                                        <form onSubmit={this.onSubmitForm} >
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
                                            <button className="btn btn-primary btn-md">
                                                Add Vendor
                                            </button>
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
