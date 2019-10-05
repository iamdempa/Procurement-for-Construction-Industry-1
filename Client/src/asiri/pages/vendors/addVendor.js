import React, { Component } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBAnimation
} from "mdbreact";
import SectionContainer from "../../../components/sectionContainer";
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

        onSubmit = (e) => {

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
                                                    <label htmlFor="inputEmail4">VendorID</label>
                                                    <input className="form-control"
                                                           id="vendorCode"
                                                           placeholder="VendorID"
                                                           type="text"
                                                           name="vendorCode"
                                                           value={vendorCode}
                                                           disabled
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
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Vendor Email</label>
                                                    <input className="form-control"
                                                           id="vendorEmail"
                                                           placeholder="Vendor Email"
                                                           type="text"
                                                           name="vendorEmail"
                                                           value={vendorEmail}
                                                           onChange={this.onChange}
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
                                                           id="inputPassword4"
                                                           placeholder="Contact Person"
                                                           type="text"
                                                           name="vendorID"
                                                           value={vendorContactPerson}
                                                           onChange={this.onChange}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputPassword4">Contact Number</label>
                                                    <input className="form-control"
                                                           id="inputPassword4"
                                                           placeholder="Contact Number"
                                                           type="text"
                                                           name="vendorID"
                                                           value={vendorContactNumber}
                                                           onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Country</label>
                                                    <input className="form-control"
                                                           id="inputPassword4"
                                                           placeholder="Country"
                                                           type="text"
                                                           name="vendorID"
                                                           value={vendorCountry}
                                                           onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>


                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Tagline</label>
                                                    <input className="form-control"
                                                           id="inputPassword4"
                                                           placeholder="Tagline"
                                                           type="text"
                                                           name="vendorID"
                                                           value={vendorTagline}
                                                           onChange={this.onChange}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputPassword4">Image URL</label>
                                                    <input className="form-control"
                                                           id="inputPassword4"
                                                           placeholder="Image URL"
                                                           type="text"
                                                           name="vendorID"
                                                           value={vendorImage}
                                                           onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="inputAddress">Description</label>
                                                <input className="form-control"
                                                       id="inputPassword4"
                                                       placeholder="Description"
                                                       type="text"
                                                       name="vendorID"
                                                       value={vendorDescription}
                                                       onChange={this.onChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputAddress">Address</label>
                                                <input className="form-control"
                                                       id="inputPassword4"
                                                       placeholder="Address"
                                                       type="text"
                                                       name="vendorID"
                                                       value={vendorAddress}
                                                       onChange={this.onChange}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-md">
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
