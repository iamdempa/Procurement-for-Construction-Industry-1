var mongoose = require('mongoose');

var itemSchema  = new mongoose.Schema({
    itemCode: { type: String },
    itemName: { type: String, default: 'untitled Item' },
    description: { type: String }
});

module.exports = mongoose.model('Item', itemSchema );
