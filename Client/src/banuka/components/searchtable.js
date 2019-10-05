import React from 'react';
import { MDBDataTable } from 'mdbreact';

const DatatablePage = () => {
  const data = {
    columns: [
      {
        label: 'InvoiceID',
        field: 'InvoiceID',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Vendor Name',
        field: 'Vendor Name',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Invoice Date',
        field: 'Invoice Date',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Expected Delivery Date',
        field: 'Expected Delivery Date',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Billing Address',
        field: 'Billing Address',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Contact Person',
        field: 'Contact Person',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Total Price',
        field: 'Total Price',
        sort: 'asc',
        width: 100
      }
    ],
    rows: [
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        age: '61',
        date: '2011/04/25',
        salary: '$320'
      },
      {
        name: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo',
        age: '63',
        date: '2011/07/25',
        salary: '$170'
      },
      {
        name: 'Ashton Cox',
        position: 'Junior Technical Author',
        office: 'San Francisco',
        age: '66',
        date: '2009/01/12',
        salary: '$86'
      },
      {
        name: 'Cedric Kelly',
        position: 'Senior Javascript Developer',
        office: 'Edinburgh',
        age: '22',
        date: '2012/03/29',
        salary: '$433'
      }
    ]
  };

  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
  );
}

export default DatatablePage;