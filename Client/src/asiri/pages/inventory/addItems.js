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



class AddItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "itemCode" :	'',
            "itemName" :	'',
            "description" :	'',
            "unitPrice" :	'',
            "vendor" :	'',
            "dateAdded"	: null,
            "quantityAvailable" : ''

        };
    }

    genarateItemID = (e) => {
        let gen = e.target.value;
        gen = 'ITM' + String(md5(gen)).substring(0, 6).toUpperCase();
        this.setState({ itemCode: gen  });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        if(e.target.name === 'itemName'){
            this.genarateItemID(e)
        }
    };

    fillRandom = (e) => {
        this.setState({
            "itemCode" :	'ITM35JH5',
            "itemName" :	'Sand',
            "description" :	'Bricks small ',
            "unitPrice" :	35.50,
            "vendor" :	'5d987827163f1d3c3fa2c132',
            "dateAdded"	: Date.now(),
            "quantityAvailable" : 4229});
    }

    onSubmitForm = (e) => {
        try {
            confirmAlert({
                title: '👉 Confirm',
                message: 'Are you sure?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => axios.post('http://34.93.185.34:3001/api/v1/items', this.state)
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
        const {itemCode, itemName, description, unitPrice, vendor, dateAdded, quantityAvailable} = this.state;
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
                                                    <MDBInput label="Item Code (Auto)" hint={itemCode} disabled type="text" />
                                                    <input className="form-control"
                                                           id="itemCode"
                                                           placeholder="Item Code"
                                                           type="text"
                                                           name="itemCode"
                                                           value={itemCode}
                                                           hidden
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputPassword4">Item Name</label>
                                                    <input className="form-control"
                                                           id="itemName"
                                                           placeholder="Item Name"
                                                           type="text"
                                                           name="itemName"
                                                           value={itemName}
                                                           onChange={this.onChange}
                                                           required
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Description</label>
                                                    <input className="form-control"
                                                           id="description"
                                                           placeholder="Description"
                                                           type="text"
                                                           name="description"
                                                           value={description}
                                                           onChange={this.onChange}
                                                           required
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputPassword4">Unit Price</label>
                                                    <input className="form-control"
                                                           id="unitPrice"
                                                           placeholder="Unit Price"
                                                           type="number"
                                                           name="unitPrice"
                                                           value={unitPrice}
                                                           onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Date Updated</label>
                                                    <input className="form-control"
                                                           id="dateAdded"
                                                           placeholder="Date Updated"
                                                           type="text"
                                                           name="dateAdded"
                                                           value={dateAdded}
                                                           onChange={this.onChange}
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputPassword4">Vendor</label>
                                                    <input className="form-control"
                                                           id="vendor"
                                                           placeholder="Vendor"
                                                           type="text"
                                                           name="vendor"
                                                           value={vendor}
                                                           onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4">Quantity Available</label>
                                                    <input className="form-control"
                                                           id="quantityAvailable"
                                                           placeholder="Quantity Available"
                                                           type="text"
                                                           name="quantityAvailable"
                                                           value={quantityAvailable}
                                                           onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                            <a onClick={this.onSubmitForm} className="btn btn-primary btn-md">
                                                Add Item
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

export default AddItems;
