import React, { Component, Fragment } from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol } from "mdbreact";

const InvoiceDetails = props => (
  <tr>
    <td>{props.currentRow._id}</td>
    <td>{props.currentRow._id}</td>
  </tr>
);

const ShowItems = props => (
  <tr style={{color:"orange"}}>
    <td>Item ID: <strong style={{fontSize: "20px"}}>{props.currentItem._id}</strong></td>
    <td>Item Name: <strong style={{fontSize: "20px"}}>{props.currentItem.itemName}</strong></td>
    <td>Purchased Quantity: <strong style={{fontSize: "20px"}}>{props.currentItem.qty}</strong></td>
    <td>Unit Price (R.s): <strong style={{fontSize: "20px"}}>{props.currentItem.unitPrice}</strong></td>
    <td>Total Price (R,s): <strong style={{fontSize: "20px"}}>{props.currentItem.linePrice}</strong></td>
  </tr>
);

export default class PrintInvoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoice: this.props.invoice,
      items: this.props.invoice.items
    };

    this.showRows = this.showRows.bind(this);
    this.showItems = this.showItems.bind(this);
  }

  showRows() {
    return this.state.invoice.map((row, id) => {
      return <InvoiceDetails currentRow={row} key={id} />;
    });
  }

  showItems() {
    return this.state.items.map((item, id) => {
      return <ShowItems currentItem={item} key={id} />;
    });
  }

  render() {
    return (
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Invoice ID</th>
            <th>Vendor Name</th>
            <th>Invoice Date</th>
            <th>Expected Delivery Date</th>
            <th>Address</th>
            <th>Contact Person</th>
            <th>Total Price (R.s)</th>
          </tr>
          <br />
          <MDBRow>
            <MDBCol className="col-md-12 col-12 text-center">
              <p>Date/Time: {new Date().toLocaleString()}</p>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol className="col-md-12 col-12 text-center">
              <strong>
                This is a computer Generated invoice and no responsibility will
                be taken - IT17157124 (K.M.J.B Jayarathna)
              </strong>
            </MDBCol>
          </MDBRow>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>{this.props.invoice._id}</td>
            <td>{this.props.invoice.vendor}</td>
            <td>
              {new Date(this.props.invoice.invoiceDate).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit"
                }
              )}
            </td>
            <td>
              {new Date(this.props.invoice.expectedDate).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit"
                }
              )}
            </td>
            <td>{this.props.invoice.billingAddress}</td>
            <td>{this.props.invoice.contactPerson}</td>
            <td>{this.props.invoice.totalPrice}</td>
          </tr>
          <br />
          
          <br/>
          {this.showItems()}
        </MDBTableBody>
      </MDBTable>
    );
  }
}
