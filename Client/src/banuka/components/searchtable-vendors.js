import React, { Component } from "react";
import { MDBDataTable, MDBBtn } from "mdbreact";
import axios from "axios";

const TableValues = {
  columns: [
    {
      label: "Contact Person",
      field: "Contact Person",
      sort: "asc",
      width: 150
    },
    {
      label: "Vendor Address",
      field: "Vendor Address",
      sort: "asc",
      width: 150
    },
    {
      label: "Vendor Country",
      field: "Vendor Country",
      sort: "asc",
      width: 270
    },
    {
      label: "Vendor Name",
      field: "Vendor Name",
      sort: "asc",
      width: 150
    },
    {
      label: "Email",
      field: "Email",
      sort: "asc",
      width: 270
    }
    ,
    {
      label: "Contact",
      field: "Contact",
      sort: "asc",
      width: 270
    }
  ]
};

export default class SearchTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoices: [],
      invoicesDuplicate: [],
      rows: [{}],
      dataa: [{}]
    };
  }

  componentDidMount() {
    const rooows = [
      {
        name: "Tiger Nixon",
        position: "System Architect",
        office: "Edinburgh",
        age: "61",
        date: "2011/04/25",
        contactPerson: "banuka",
        salary: "$320"
      },
      {
        name: "Garrett Winters",
        position: "Accountant",
        office: "Tokyo",
        age: "63",
        date: "2011/07/25",
        ontactPerson: "banuka",
        salary: "$170"
      }
    ];

    axios
      .get("http://localhost:4005/purchaseinvoices/vendors")
      .then(response => {
        var trimmed = response.data.forEach(function(item) {
          delete item["__v"];
          delete item["_id"];
          delete item["vendorTagline"];
          delete item["vendorLastUpdate"];
          delete item["vendorDescription"];
          delete item["vendorImage"];
          delete item["vendorPaymentID"];
          delete item["vendorCode"];
        });
        console.log(trimmed)
        TableValues.rows = response.data;
        console.log(response.data);
        this.setState({
          invoices: response.data,
          dataa: TableValues
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <MDBDataTable striped bordered small data={this.state.dataa} />
      </div>
    );
  }
}
