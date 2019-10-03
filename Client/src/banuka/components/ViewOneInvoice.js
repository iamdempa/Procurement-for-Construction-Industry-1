import React, { Component } from "react";
import SideNavigation from "./sideNavigation";
import BreadCrumb from "./BreadcrumSection";

import { NavLink } from "react-router-dom";

import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";

// error messages
import ItemNotSelectedWarning from "./warning";
import ErrorMessageBelowSaveButton from "./errorMessageBelowSaveButton";

const styles = {
  errorVendor: {
    border: "1px solid red"
  },
  errorInvoiceDate: {
    border: "1px solid red"
  },
  errorExpectedDate: {
    border: "1px solid red"
  },
  errorAddress: {
    border: "1px solid red"
  },
  errorContactPerson: {
    border: "1px solid red"
  },
  errorItem: {
    border: "1px solid red"
  },
  notError: {
    border: ""
  }
};

export default class ViewInvoice extends Component {
  constructor(props) {
    super(props);

    this.getItemRef = React.createRef();
    this.scrollRef = React.createRef();
    this.scrollToInvoiceDate = React.createRef();
    this.scrollToExpectedDate = React.createRef();
    this.scrollToItem = React.createRef();

    this.state = {
      vendorName: "",
      itemID: "",
      qty: "",
      rows: [{}],
      showItemNotSelectedWarning: false,
      address: "",
      contactPerson: "",
      invoiceDate: "",
      expectedDate: "",

      isValidated: false,
      isVendorValidated: false,
      isInvoiceDateValidated: false,
      isExpectedDateValidated: false,
      isAddressValidated: false,
      isContactPersonValidated: false,
      isItemValidated: false,

      errorArr: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.vendorOnChange = this.vendorOnChange.bind(this);
    this.itemorOnChange = this.itemorOnChange.bind(this);
    this.quantityOnChange = this.quantityOnChange.bind(this);
    this.onHandleAddRow = this.onHandleAddRow.bind(this);
    this.handleRemoveSpecificRow = this.handleRemoveSpecificRow.bind(this);
    this.addressOnChange = this.addressOnChange.bind(this);
    this.contactPersonOnChange = this.contactPersonOnChange.bind(this);
    this.invoiceDateOnChange = this.invoiceDateOnChange.bind(this);
    this.expectedDateOnChange = this.expectedDateOnChange.bind(this);
  }

  componentDidMount() {
    const itemDetails = {
      itemID: "A",
      itemName: "5",
      qty: "50",
      unitPrice: "A",
      linePrice: "5"
    };

    //load data to array from database so they will be shown in the invoice update process
    this.setState({
      rows: [...this.state.rows, itemDetails]
    });
  }

  // Add
  onHandleAddRow() {
    const itemDetails = {
      itemID: this.state.itemID,
      itemName: this.state.itemID,
      qty: this.state.qty,
      unitPrice: "unit",
      linePrice: "total"
    };

    this.setState({
      rows: [...this.state.rows, itemDetails]
    });

    if (this.getItemRef.current.value === "1") {
      this.setState({
        showItemNotSelectedWarning: true
      });
    } else {
      this.setState({
        showItemNotSelectedWarning: false
      });
    }
  }

  // delete
  handleRemoveSpecificRow = idx => () => {
    const rows = [...this.state.rows];
    rows.splice(idx, 1);
    this.setState({ rows });
  };

  //vendor
  vendorOnChange(e) {
    this.setState({
      vendorName: e.target.value
    });

    if (e.target.value.toString() !== "1") {
      this.setState({
        isVendorValidated: false
      });
    }
  }

  quantityOnChange(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({ qty: e.target.value });
    }
  }

  itemorOnChange(e) {
    this.setState({
      itemID: e.target.value
    });

    if (e.target.value !== "") {
      this.setState({
        isItemValidated: false
      });
    }
  }

  addressOnChange(e) {
    this.setState({
      address: e.target.value
    });

    if (e.target.value.toString !== "") {
      this.setState({
        isAddressValidated: false
      });
    }
  }

  contactPersonOnChange(e) {
    this.setState({
      contactPerson: e.target.value
    });

    if (e.target.value.toString() !== "") {
      this.setState({
        isContactPersonValidated: false
      });
    }
  }

  invoiceDateOnChange(e) {
    this.setState({
      invoiceDate: e.target.value
    });

    if (e.target.value !== "") {
      this.setState({
        isInvoiceDateValidated: false
      });
    }
  }

  expectedDateOnChange(e) {
    this.setState({
      expectedDate: e.target.value
    });

    if (e.target.value !== "") {
      this.setState({
        isExpectedDateValidated: false
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    alert(this.state.rows);

    const vendorName = this.state.vendorName.toString();
    const invoiceDate = this.state.invoiceDate;
    const expectedDate = this.state.expectedDate;
    const address = this.state.address.toString();
    const contactPerson = this.state.contactPerson.toString();
    const itemID = this.state.itemID;
    const rowCount = this.state.rows.length; //should be greater than 1

    if (itemID === "1" || itemID === "") {
      window.scrollTo(0, this.getItemRef.current.offsetTop);
      this.setState({
        isItemValidated: true
      });
    } else {
      this.setState({
        isItemValidated: false
      });
    }

    if (vendorName === "1" || vendorName === "") {
      window.scrollTo(0, this.scrollRef.current.offsetTop);
      this.setState({
        isVendorValidated: true
      });
    } else {
      this.setState({
        isVendorValidated: false
      });
    }

    if (address === "") {
      window.scrollTo(0, this.scrollRef.current.offsetTop);
      this.setState({
        isAddressValidated: true
      });
    } else {
      this.setState({
        isAddressValidated: false
      });
    }

    if (contactPerson === "") {
      window.scrollTo(0, this.scrollRef.current.offsetTop);
      this.setState({
        isContactPersonValidated: true
      });
    } else {
      this.setState({
        isContactPersonValidated: false
      });
    }

    if (!invoiceDate || invoiceDate === "") {
      window.scrollTo(0, this.scrollToInvoiceDate.current.offsetTop);
      this.setState({
        isInvoiceDateValidated: true
      });
    } else {
      this.setState({
        isInvoiceDateValidated: false
      });
    }

    if (!expectedDate || expectedDate === "") {
      window.scrollTo(0, this.scrollToExpectedDate.current.offsetTop);
      this.setState({
        isExpectedDateValidated: true
      });
    } else {
      this.setState({
        isExpectedDateValidated: false
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-3">
              <SideNavigation />
            </div>
            <div className="col-md-9 col-9">
              <BreadCrumb />
            </div>
          </div>

          <hr />
          <div className="row">
            <div className="col-md-3 col-3"></div>
            <div className="col-md-9 col-9">
              <MDBCard className="my-12 px-12 pb-12">
                <MDBCardBody className="">
                  <h5 className="h5-responsive font-weight-bold text-center my-5">
                    Invoice -
                  </h5>

                  {/* form starts here */}
                  <form onSubmit={this.onSubmit}>
                    <MDBRow>
                      <MDBCol lg="6" md="6" className="mb-lg-0 mb-6">
                        <p className="h6 mb-4">
                          {" "}
                          <i className="fa fa-info-circle"></i> Invoice Details
                        </p>
                        <label
                          htmlFor="defaultFormRegisterNameEx"
                          className="grey-text"
                        >
                          Invoice No:
                        </label>
                        <input
                          type="text"
                          id="defaultFormRegisterNameEx"
                          className="form-control"
                        />
                        <br />
                        <label
                          htmlFor="defaultFormRegisterEmailEx"
                          className="grey-text"
                        >
                          Vendor
                        </label>
                        <div class="form-group">
                          <select
                            ref={this.scrollRef}
                            class="form-control"
                            id="exampleSelect1"
                            onChange={this.vendorOnChange}
                            style={
                              this.state.isVendorValidated
                                ? styles.errorVendor
                                : styles.notError
                            }
                          >
                            <option disabled selected value="1">
                              - Select vendor -{" "}
                            </option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <label
                          htmlFor="defaultFormRegisterConfirmEx"
                          className="grey-text"
                        >
                          Invoice Date:
                        </label>
                        <input
                          ref={this.scrollToInvoiceDate}
                          type="date"
                          id="defaultFormRegisterConfirmEx"
                          className="form-control"
                          style={
                            this.state.isInvoiceDateValidated
                              ? styles.errorInvoiceDate
                              : styles.notError
                          }
                          value={this.state.invoiceDate}
                          onChange={this.invoiceDateOnChange}
                        />
                        <br />
                        <label
                          htmlFor="defaultFormRegisterPasswordEx"
                          className="grey-text"
                        >
                          Expected Delievery Date:
                        </label>
                        <input
                          ref={this.scrollToExpectedDate}
                          type="date"
                          id="defaultFormRegisterPasswordEx"
                          className="form-control"
                          style={
                            this.state.isExpectedDateValidated
                              ? styles.errorExpectedDate
                              : styles.notError
                          }
                          value={this.state.expectedDate}
                          onChange={this.expectedDateOnChange}
                        />
                      </MDBCol>
                      <MDBCol lg="6" md="6" className="mb-lg-0 mb-6">
                        <p className="h6 mb-4">
                          {" "}
                          <i className="fa fa-truck"></i> Delievery Details
                        </p>
                        <label
                          htmlFor="defaultFormRegisterNameEx"
                          className="grey-text"
                        >
                          Billing Address
                        </label>
                        <textarea
                          className="form-control"
                          style={
                            this.state.isAddressValidated
                              ? styles.errorAddress
                              : styles.notError
                          }
                          value={this.state.address}
                          onChange={this.addressOnChange}
                        ></textarea>

                        <label
                          htmlFor="defaultFormRegisterEmailEx"
                          className="grey-text"
                        >
                          Contact Person:
                        </label>
                        <input
                          type="text"
                          id="defaultFormRegisterEmailEx"
                          className="form-control"
                          style={
                            this.state.isContactPersonValidated
                              ? styles.errorContactPerson
                              : styles.notError
                          }
                          value={this.state.contactPerson}
                          onChange={this.contactPersonOnChange}
                        />
                        <br />
                        <label
                          htmlFor="defaultFormRegisterConfirmEx"
                          className="grey-text"
                        ></label>
                        <input
                          hidden
                          type="email"
                          id="defaultFormRegisterConfirmEx"
                          className="form-control"
                        />
                        <br />
                        <label
                          htmlFor="defaultFormRegisterPasswordEx"
                          className="grey-text"
                        ></label>
                        <input
                          hidden
                          type="password"
                          id="defaultFormRegisterPasswordEx"
                          className="form-control"
                        />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol
                        lg="5"
                        md="5"
                        className="mb-lg-0 mb-5 text-center"
                      >
                        <div class="form-group">
                          <label
                            htmlFor="defaultFormRegisterEmailEx"
                            className="grey-text"
                          >
                            Select an Item:
                          </label>
                          <select
                            class="form-control"
                            onChange={this.itemorOnChange}
                            ref={this.getItemRef}
                            style={
                              this.state.isItemValidated
                                ? styles.errorItem
                                : styles.notError
                            }
                          >
                            <option disabled selected value="1">
                              - Select Item -
                            </option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                      </MDBCol>
                      <MDBCol
                        lg="5"
                        md="5"
                        className="mb-lg-0 mb-5 text-center"
                      >
                        <div class="form-group">
                          <label
                            htmlFor="defaultFormRegisterEmailEx"
                            className="grey-text"
                          >
                            Quantity:
                          </label>
                          <input
                            type="text"
                            id="defaultFormRegisterEmailEx"
                            className="form-control"
                            value={this.state.qty}
                            onChange={this.quantityOnChange}
                          />
                        </div>
                      </MDBCol>

                      <MDBCol
                        lg="2"
                        md="2"
                        className="mb-lg-0 mb-2 text-center"
                      >
                        <div className="form-group">
                          <label
                            htmlFor="defaultFormRegisterEmailEx"
                            className="grey-text"
                          ></label>
                          <button
                            style={{ height: "40px" }}
                            name="subject"
                            type="button"
                            className="btn btn-info btn-sm form-control"
                            onClick={this.onHandleAddRow}
                          >
                            <i className="fa fa-plus fa-lg"></i>
                          </button>
                        </div>
                      </MDBCol>
                    </MDBRow>

                    {this.state.showItemNotSelectedWarning ? (
                      <ItemNotSelectedWarning />
                    ) : (
                      <p></p>
                    )}

                    <MDBRow>
                      <MDBCol
                        lg="12"
                        md="12"
                        className="mb-lg-0 mb-12 text-center"
                      >
                        <MDBTable
                          className="container-fluid"
                          striped
                          bordered
                          hover
                          responsive
                        >
                          <MDBTableHead color="primary-color" textWhite>
                            <tr>
                              <th>Item ID</th>
                              <th>Item Name</th>
                              <th>Qty</th>
                              <th>Unit Price (R.s)</th>
                              <th>Line Price (R.s)</th>
                              <th>
                                <i className="fa fa-cog"></i>
                              </th>
                            </tr>
                          </MDBTableHead>

                          <MDBTableBody>
                            {this.state.rows.length > 1 ? (
                              this.state.rows.map((item, id) =>
                                id === 0 ? (
                                  <tr></tr>
                                ) : item.itemID === "" ||
                                  item.itemID === null ? (
                                  this.state.rows.length > 1 ? (
                                    <tr key={id}>
                                      <td>{item.itemID}</td>
                                      <td>{item.itemID}</td>
                                      {item.qty === "" ? (
                                        <td>0</td>
                                      ) : (
                                        <td>{item.qty}</td>
                                      )}
                                      <td>{item.unitPrice}</td>
                                      <td>{item.linePrice}</td>

                                      <MDBBtn
                                        onClick={this.handleRemoveSpecificRow(
                                          id
                                        )}
                                        color="red"
                                      >
                                        <i className="fa fa-trash"></i>
                                      </MDBBtn>
                                    </tr>
                                  ) : (
                                    <p></p>
                                  )
                                ) : (
                                  <tr key={id}>
                                    <td>{item.itemID}</td>
                                    <td>{item.itemID}</td>
                                    {item.qty === "" ? (
                                      <td>0</td>
                                    ) : (
                                      <td>{item.qty}</td>
                                    )}
                                    <td>{item.unitPrice}</td>
                                    <td>{item.linePrice}</td>

                                    <MDBBtn
                                      onClick={this.handleRemoveSpecificRow(id)}
                                      color="red"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </MDBBtn>
                                  </tr>
                                )
                              )
                            ) : (
                              <tr></tr>
                            )}
                          </MDBTableBody>
                        </MDBTable>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol className="col-md-7 col-7"></MDBCol>
                      <MDBCol className="col-md-5 col-5 text-right">
                        <NavLink to="/banuka/view">
                          <MDBBtn
                            type="reset"
                            className="btn btn-secondary btn-sm"
                            color="grey"
                          >
                            Close
                          </MDBBtn>
                        </NavLink>
                        <MDBBtn
                          color="green"
                          type="submit"
                          className="btn btn-success btn-sm"
                        >
                          Update Invoice
                        </MDBBtn>

                        <MDBBtn
                          type="button"
                          className="btn btn-danger btn-sm"
                          color="red"
                        >
                          Delete
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
