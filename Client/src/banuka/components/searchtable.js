import React, { Component } from "react";
import { MDBDataTable, MDBBtn } from "mdbreact";
import axios from "axios";

const TableValues = {
  columns: [
    {
      label: "Item Name",
      field: "Item Name",
      sort: "asc",
      width: 150
    },
    {
      label: "Description",
      field: "Description",
      sort: "asc",
      width: 150
    },
    {
      label: "Unit Price",
      field: "Unit Price",
      sort: "asc",
      width: 270
    },
    {
      label: "Vencdor ID",
      field: "Vencdor ID",
      sort: "asc",
      width: 150
    },
    {
      label: "Date Added",
      field: "Date Added",
      sort: "asc",
      width: 270
    }
    ,
    {
      label: "Quantity Available",
      field: "Quantity Available",
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
      .get("http://localhost:4005/purchaseinvoices/items")
      .then(response => {
        var trimmed = response.data.forEach(function(item) {
          delete item["__v"];
          delete item["_id"];
          delete item["itemCode"];
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
