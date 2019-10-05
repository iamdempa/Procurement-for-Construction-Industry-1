const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let invoices = new Schema({
  vendor: { type: String },
  invoiceDate: { type: Date, default: Date.now },
  expectedDate: { type: Date, default: Date.now },
  billingAddress: { type: String },
  contactPerson: { type: String },
  items: [
    {
      itemID: {type: Number},
      qty: { type: Number },
      unitPrice: { type: Number },
      linePrice: { type: Number }
    }
  ],
  totalPrice: { type: Number }
});

module.exports = mongoose.model("invoices", invoices);
