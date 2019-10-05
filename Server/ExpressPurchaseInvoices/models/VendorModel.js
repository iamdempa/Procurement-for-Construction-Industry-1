var mongoose = require('mongoose');

//vendor schema
var vendorSchema  = new mongoose.Schema({
	vendorCode: { type: String, required:true},
	vendorName: { type: String, required:true},
	vendorEmail: { type: String, required:true},
    vendorPaymentID: { type: String, default: 'untitled Item' },
    vendorContactPerson: { type: String, default: 'default agent' },
    vendorDescription: { type: String, default: 'no description' },
    vendorAddress: { type: String, default: '' },
    vendorCountry: { type: String, default: '' },
    vendorContactNumber: { type: String },
    vendorTagline: { type: String, default: 'No tagline' },
    vendorImage: { type: String, default: '' },
	vendorLastUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vendor', vendorSchema );
