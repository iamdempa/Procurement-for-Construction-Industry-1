var mongoose = require('mongoose');

var itemSchema  = new mongoose.Schema({
    itemCode: { type: String, match: /[a-zA-Z0-9 ]/ },
    itemName: { type: String, match: /[a-zA-Z0-9 ]/ , default: 'untitled Item' },
    description: { type: String, match: /[a-zA-Z0-9 ]/ }
});

module.exports = mongoose.model('Item', itemSchema );
