import React, { Component } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import {Link} from 'react-router-dom';


const styles = {
  mouse: {
    cursor: "pointer"
  }
};
export default class ParentComponent extends Component {
  constructor() {
    super();

    this.state = {
      data: [
        {
          id: 1,
          date: "2014-04-18",
          total: 121.0,
          status: "Shipped",
          name: "A",
          points: 5,
          percent: 50
        },
        {
          id: 2,
          date: "2014-04-21",
          total: 121.0,
          status: "Not Shipped",
          name: "B",
          points: 10,
          percent: 60
        },
        {
          id: 3,
          date: "2014-08-09",
          total: 121.0,
          status: "Not Shipped",
          name: "C",
          points: 15,
          percent: 70
        },
        {
          id: 4,
          date: "2014-04-24",
          total: 121.0,
          status: "Shipped",
          name: "D",
          points: 20,
          percent: 80
        },
        {
          id: 5,
          date: "2014-04-26",
          total: 121.0,
          status: "Shipped",
          name: "E",
          points: 25,
          percent: 90
        }
      ],
      expandedRows: []
    };
  }

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(item) {
    const clickCallback = () => this.handleRowClick(item.id);
    const itemRows = [
      <tr onClick={clickCallback} key={"row-data-" + item.id}>
        <td>{item.date}</td>
        <td>{item.total}</td>
        <td>{item.status}</td>
        <td>{item.date}</td>
        <td>{item.total}</td>
        <td>{item.status}</td>
        <Link to="/banuka/view/:id"><td><i className="fa fa-pen"></i></td></Link>
      </tr>
    ];

    if (this.state.expandedRows.includes(item.id)) {
      itemRows.push(

        <tr key={"row-expanded-" + item.id} className="alert alert-primary">
          <td>{item.name}</td>
          <td>{item.points}</td>
          <td>{item.percent}</td>
          <td>{item.name}</td>
          <td>{item.points}</td>
          <td>{item.percent}</td>
        </tr>

       
      );
    }

    return itemRows;
  }

  render() {
    let allItemRows = [];

    this.state.data.forEach(item => {
      const perItemRows = this.renderItem(item);
      allItemRows = allItemRows.concat(perItemRows);
    });

    return (
      <MDBTable
        className="container-fluid"
        hover
        responsive
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
