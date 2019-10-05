var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/Item.js');

/* GET ALL PRODUCTS */
router.get('/', function(req, res, next) {
  Item.find(function (err, items) {
    if (err) return next(err);
    res.json(items);
  });
});

/* GET SINGLE ITEM BY ID */
router.get('/:id', function(req, res, next) {
  Item.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE ITEM BY CODE */
//http://localhost:3001/api/v1/items/itemCode/DZGDG
router.get('/itemCode/:id', function(req, res, next) {
	Item.findOne({itemCode: new RegExp('^'+req.params.id+'$', "i")}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE ITEM */
router.post('/', function(req, res, next) {
  console.log(req.body);
  Item.create(
	{
	  itemName:req.body.itemName,
	  itemCode:req.body.itemCode,
	  description:req.body.description,
	  untiPrice: req.body.unitPrice,
	  vendor: mongoose.Types.ObjectId(req.body.vendor)
	},
		function (err, post) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(req.body);
  });
});

/* UPDATE ITEM */
router.put('/:id', function(req, res, next) {
  console.log(req.body);
  Item.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(post);
  });
});

/* DELETE ITEM */
router.delete('/:id', function(req, res, next) {
  Item.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE MANY ITEM */
router.delete('many/:id', function(req, res, next) {
Item.findOneAndRemove({itemName: req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
	});
});
			
module.exports = router;
