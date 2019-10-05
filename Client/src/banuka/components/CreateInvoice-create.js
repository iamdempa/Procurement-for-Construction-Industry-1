import React, { Component } from "react";

import axios from "axios";

// import DummyData from '../dummyData/dataSet';

import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";
import { NavLink } from "react-router-dom";

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

const ShowItems = props => (
  <option
    value={`${props.currentItem._id}/${props.currentItem.itemName}/${props.currentItem.untiPrice}`}
  >
    {props.currentItem.itemName}
  </option>
);

const ShowVendors = props => (
  <option value={`${props.currentVendor.vendorName}`}>
    {props.currentVendor.vendorName}
  </option>
)

export default class CreateInvoiceForm extends Component {
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
      itemName: "",
      itemUnitPrice: 0.0,
      totalPrice: 0.0,
      qty: 0,
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

      isExpcetedDateSmallerThanInvoiceDate: false,
      isAtLeastAnItemAdded: false,

      errorArr: [],

      //get items from database
      items: [],
      //get vendors from database
      vendors: []
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

    //get items on the dropdown
    axios
      .get("http://localhost:4005/purchaseinvoices/items")
      .then(response => {
        this.setState({
          items: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });

      //get vendors on the dropdown
      axios.get('http://localhost:4005/purchaseinvoices/vendors')
      .then((response) => {
        this.setState({
          vendors: response.data
        });
      }).catch((err) => {
        console.log(err);
      })
  }

  // Add
  onHandleAddRow() {
    var itemId = this.state.itemID;
    var itemName = this.state.itemName;
    var qty = this.state.qty;
    

    var unitPrice = this.state.itemUnitPrice;
    var linePrice = 0;
    if (qty === 0 || qty === "") {
      linePrice = unitPrice;
      qty = 1;
    } else {
      linePrice = unitPrice * qty;
      qty = qty;
    }

    this.setState({
      totalPrice: this.state.totalPrice + linePrice
    });

    const itemDetails = {
      _id: itemId,
      itemName: itemName,
      qty: qty,
      unitPrice: unitPrice,
      linePrice: linePrice
    };

    this.setState({
      rows: [...this.state.rows, itemDetails]
    });

    if (this.getItemRef.current.value === "1") {
      this.setState({
        showItemNotSelectedWarning: true,
        isAtLeastAnItemAdded: true
      });
    } else {
      this.setState({
        showItemNotSelectedWarning: false,
        isAtLeastAnItemAdded: false
      });
    }
  }

  // delete
  handleRemoveSpecificRow = idx => () => {
    const rows = [...this.state.rows];
    var removed = rows.splice(idx, 1);

    this.setState({ rows, totalPrice: this.state.totalPrice-removed[0].linePrice });
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
    var arr = e.target.value.split("/");
    var uPrice = Number(arr[2]);

    this.setState({
      itemID: arr[0],
      itemName: arr[1],
      itemUnitPrice: uPrice
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
        isExpectedDateValidated: false,
        isExpcetedDateSmallerThanInvoiceDate: false
      });
    }

    if (e.target.value < this.state.invoiceDate) {
      this.setState({
        isExpectedDateValidated: true,
        isExpcetedDateSmallerThanInvoiceDate: true
      });
    }
  }

  //form submission
  onSubmit(e) {
    e.preventDefault();

    const vendorName = this.state.vendorName.toString();
    const invoiceDate = this.state.invoiceDate;
    const expectedDate = this.state.expectedDate;
    const address = this.state.address.toString();
    const contactPerson = this.state.contactPerson.toString();
    const itemID = this.state.itemID;
    const rowCount = this.state.rows.length; //should be greater than 1

    var flag1 = false;
    var flag2 = false;
    var flag3 = false;
    var flag4 = false;
    var flag5 = false;
    var flag6 = false;
    var flag7 = false;

    if (itemID === "1" || itemID === "") {
      //if no items seletced
      flag1 = false;
      window.scrollTo(0, this.getItemRef.current.offsetTop);
      this.setState({
        isItemValidated: true
      });
    } else {
      flag1 = true;
      //if an item selected
      this.setState({
        isItemValidated: false
      });
    }

    if (vendorName === "1" || vendorName === "") {
      //if no vendors selected
      flag2 = false;
      window.scrollTo(0, this.scrollRef.current.offsetTop);
      this.setState({
        isVendorValidated: true
      });
    } else {
      //if a vendor is selected
      flag2 = true;
      this.setState({
        isVendorValidated: false
      });
    }

    if (address === "") {
      //if address is not typed
      flag3 = false;
      window.scrollTo(0, this.scrollRef.current.offsetTop);
      this.setState({
        isAddressValidated: true
      });
    } else {
      //address is typed
      flag3 = true;
      this.setState({
        isAddressValidated: false
      });
    }

    if (contactPerson === "") {
      //if contact person name not typed
      flag4 = false;
      window.scrollTo(0, this.scrollRef.current.offsetTop);
      this.setState({
        isContactPersonValidated: true
      });
    } else {
      //if contact person name typed
      flag4 = true;
      this.setState({
        isContactPersonValidated: false
      });
    }

    if (!invoiceDate || invoiceDate === "") {
      //if no invoice date selected
      flag5 = false;
      window.scrollTo(0, this.scrollToInvoiceDate.current.offsetTop);
      this.setState({
        isInvoiceDateValidated: true
      });
    } else {
      //if invoice date selected
      flag5 = true;
      this.setState({
        isInvoiceDateValidated: false
      });
    }

    if (!expectedDate || expectedDate === "") {
      //if expected date is not selected
      //if no date is selected
      flag6 = false;
      window.scrollTo(0, this.scrollToExpectedDate.current.offsetTop);
      this.setState({
        isExpectedDateValidated: true
      });
    } else {
      //if expected date is not selected

      //check if expected date is a old date
      if (expectedDate < invoiceDate) {
        flag6 = false;
        window.scrollTo(0, this.scrollToExpectedDate.current.offsetTop);
        this.setState({
          isExpectedDateValidated: true,
          isExpcetedDateSmallerThanInvoiceDate: true
        });
      } else {
        flag6 = true;
        this.setState({
          isExpectedDateValidated: false,
          isExpcetedDateSmallerThanInvoiceDate: false
        });
      }
    }

    if (rowCount > 1) {
      //if an item is added
      flag7 = true;
      this.setState({
        isAtLeastAnItemAdded: false
      });
    } else {
      //if no item is added
      flag7 = false;
      this.setState({
        isAtLeastAnItemAdded: true
      });
    }

    //everything is validated and form can be submitted
    if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7) {
      var it = new Date(this.state.invoiceDate); //invoice date
      var ed = new Date(this.state.expectedDate); //expected date

      const newInvoice = {
        vendor: this.state.vendorName,
        invoiceDate: it,
        expectedDate: ed,
        billingAddress: this.state.address,
        contactPerson: this.state.contactPerson,
        items: this.state.rows,
        totalPrice: this.state.totalPrice
      };

      axios
        .post("http://localhost:4005/purchaseinvoices/create", newInvoice)
        .then(res => {
          console.log(res.data);
        }).then(
          setTimeout(function () { 
            window.location.reload();
          }, 2000)
        )
        .catch(err => {
          console.log(err);
        });
    }
  }

  //get items on the dropdown
  getItems() {
    return this.state.items.map((item, id) => {
      return <ShowItems currentItem={item} key={id} />;
    });
  }

  getVendors(){
    return this.state.vendors.map((vendor, id) => {
      return <ShowVendors currentVendor={vendor} key={id} />
    });
  }

  render() {
    return (
      <div>
        <MDBCard className="my-12 px-12 pb-12">
          <MDBCardBody className="">
            <h2 className="h1-responsive font-weight-bold text-center my-5">
              Create a Purchase Invoice
            </h2>
            <p className="text-center w-responsive mx-auto mb-5">
              Creating purchase invoices
              <strong> Without having a Purchase Order</strong>
            </p>

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
                    disabled
                  />
                  <small style={{color:"gray"}}>(This value is auto-generated for user's easiness)</small>
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
                      {this.getVendors()}
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
                  {this.state.isExpcetedDateSmallerThanInvoiceDate ? (
                    <small style={{ color: "red" }}>
                      Expected Date should be today or a future date
                    </small>
                  ) : (
                    <p></p>
                  )}
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
              {/* new row======================================================= */}

              <MDBRow>
                <MDBCol lg="5" md="5" className="mb-lg-0 mb-5 text-center">
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
                      {this.getItems()}
                    </select>
                  </div>
                </MDBCol>

                <MDBCol lg="5" md="5" className="mb-lg-0 mb-5 text-center">
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
                    <small style={{ color: "gray" }}>
                      (If not given, system will automatically consider quanity
                      as 1)
                    </small>
                  </div>
                </MDBCol>

                <MDBCol lg="2" md="2" className="mb-lg-0 mb-2 text-center">
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

              {this.state.showItemNotSelectedWarning ||
              this.state.isAtLeastAnItemAdded ? (
                <ItemNotSelectedWarning />
              ) : (
                <p></p>
              )}

              <MDBRow>
                <MDBCol lg="12" md="12" className="mb-lg-0 mb-12 text-center">
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
                          id === 0 ? ( //if array is empty
                            <tr key={id}></tr>
                          ) : item._id === "" ||
                            item._id === null ||
                            item._id === 0 ? ( //if no items were selected
                            <tr key={id}></tr>
                          ) : (
                            //where it shows the items adding to table
                            <tr key={id}>
                              <td>{item._id}</td>
                              <td>{item.itemName}</td>
                              {item.qty === "" || item.qty === 0 ? (
                                <td>1</td>
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
              <br />
              <MDBRow>
                <MDBCol className="col-md-8 col-8"></MDBCol>
                <MDBCol className="col-md-4 col-4 text-right">
                  <p>
                    Total Price is: R.s{" "}
                    <strong style={{ fontSize: "24px" }}>
                      {Math.round(this.state.totalPrice * 100) / 100}
                    </strong>
                  </p>

                  <NavLink to="/banuka/dashboard">
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
                    Save
                  </MDBBtn>
                  {this.state.showErrorMessageUnderSaveButton ? (
                    <ErrorMessageBelowSaveButton />
                  ) : (
                    <p></p>
                  )}
                </MDBCol>
              </MDBRow>
            </form>

            {/* form ends here */}
          </MDBCardBody>
        </MDBCard>
        <br />
      </div>
    );
  }
}
