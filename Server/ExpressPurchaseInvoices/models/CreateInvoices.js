const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let invoices = new Schema({
  vendor: { type: String },
  invoiceDate: { type: Date},
  expectedDate: { type: Date},
  billingAddress: { type: String },
  contactPerson: { type: String },
  items: [
    {
      _id: {type: Number},
      itemName: {type: String},
      qty: { type: Number },
      unitPrice: { type: Number },
      linePrice: { type: Number }
    }
  ],
  totalPrice: { type: Number }
});

module.exports = mongoose.model("invoices", invoices);
