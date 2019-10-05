var mongoose = require('mongoose');
var Sch = mongoose.Schema;

//Item schema
var itemSchema  = new mongoose.Schema({
    itemCode: { type: String, required:true},
    itemName: { type: String, default: 'untitled Item' },
    description: { type: String, default: 'No description found'},
	untiPrice: { type: Number, required:true},
	vendor: { type: Sch.ObjectId, ref:'Vendor'},
	dateAdded : {type: Date, default: Date.now}
});

module.exports = mongoose.model('Item', itemSchema );
