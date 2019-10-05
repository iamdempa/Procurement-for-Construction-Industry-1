import React, { Component, Fragment } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Link } from "react-router-dom";
import axios from "axios";

const styles = {
  mouse: {
    cursor: "pointer"
  }
};

const Invoices = props => (
  <tr>
    {/* <tr onClick={clickCallback} key={"row-data-" + item.id}></tr> */}
    <td>Machan</td>

    <Link to="/banuka/view/:id">
      <td>
        <i className="fa fa-pen"></i>
      </td>
    </Link>
  </tr>
);

export default class ParentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoices: [],
      rows: [{}],
      
      expandedRows: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4005/purchaseinvoices")
      .then(response => {
        this.setState({
          invoices: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getInvoices() {
    return this.state.invoices.map((currentInvoice, i) => {
      return <Invoices invoice={currentInvoice} key={i} />;
    });
  }

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
   
    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

    // alert(newExpandedRows.length)

    this.setState({ expandedRows: newExpandedRows });

    axios
      .get("http://localhost:4005/purchaseinvoices/" + rowId)
      .then(response => {
        this.setState({
          rows: [...this.state.rows, ...response.data.items]
        });
      }).then(
        this.setState({
          rows: [{}]
        })
      )
  }

  renderItem(item) {
    //Invoice Details
    const clickCallback = () => this.handleRowClick(item._id); 
    var invoiceDate = new Date(item.invoiceDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    var expectedDate = new Date(item.expectedDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });

    //will show the invoices
    const itemRows = [
      <tr onClick={clickCallback} key={"row-data-" + item._id}>
        <td>{item._id}</td>
        <td>{item.vendor}</td>
        <td>{invoiceDate}</td>
        <td>{expectedDate}</td>
        <td>{item.billingAddress}</td>
        <td>{item.contactPerson}</td>
        <Link to={`/banuka/view/${item._id}`}>
          <td>
            <i className="fa fa-pen"></i>
          </td>
        </Link>
      </tr>
    ];

    if (this.state.expandedRows.includes(item._id)) {
      //Item related to a specific invoice
      // itemRows.push(
      //   <tr key={"row-expanded-" + item._id} className="alert alert-primary">
      //     <td>{item.items._id}</td>
      //     <td>{item.points}</td>
      //     <td>{item.percent}</td>
      //     <td>{item.name}</td>
      //     <td>{item.points}</td>
      //     <td>{item.percent}</td>
      //   </tr>
      // );

      this.state.rows.map((item, id) =>
        id === 0
          ? null
          : item._id === "" || //if array is empty
            item._id === null ||
            item._id === 0 ||
            item._id === undefined
          ? null //if no items were selected
          : itemRows.push(
              <tr
                key={"row-expanded-" + item._id}
                className="alert alert-primary"
              >
                <td></td>
                <td><strong>Item ID:</strong> <br/> <span style={{fontSize: "24px"}}>{item._id}</span></td>
                <td><strong>Quantity:</strong> <br/> <span style={{fontSize: "24px"}}>{item.qty}</span></td>
                <td><strong>Unit Price (R.s):</strong> <br/> <span style={{fontSize: "24px"}}>{item.unitPrice}</span></td>
                <td><strong>Total Line Price (R.s):</strong> <br/> <span style={{fontSize: "24px"}}>{Number(item.qty*item.unitPrice)}</span></td>
                <td></td>
                <td></td>
              </tr>
            )
      );
    }

    return itemRows;
  }

  render() {
    let allItemRows = [];

    this.state.invoices.forEach(item => {
      const perItemRows = this.renderItem(item);
      allItemRows = allItemRows.concat(perItemRows);
    });

    return (
      <MDBTable
        className="container-fluid"
        hover
        responsive
        
        bordered
        style={styles.mouse}
      >
        <MDBTableHead color="primary-color" textWhite>
          <tr>
            <th>Invoice No</th>
            <th>Vendor Name</th>
            <th>Invoice Date</th>
            <th>Expected Delivery</th>
            <th>Billing Address</th>
            <th>Contact Person</th>
            <th></th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>{allItemRows}</MDBTableBody>
      </MDBTable>
    );
  }
}

/*
export default class ViewInvoice extends Component {
  render() {
    return (
      <div>
        <MDBTable className="container-fluid" bordered hover responsive>
          <MDBTableHead color="primary-color" textWhite>
            <tr>
              <th>Invoice No</th>
              <th>Vendor Name</th>
              <th>Invoice Date</th>
              <th>Expected Delivery</th>
              <th>Billing Address</th>
              <th>Contact Person</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>

            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </MDBTableBody>
        </MDBTable>

        <br />

        
      </div>
    );
  }
}
*/
